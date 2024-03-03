import httpStatus from "http-status";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { AppError } from "../../errors/AppError";
import { courseSearchableFields } from "./course.constant";
import { TCourse, TCourseFaculties } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const defaultQuery = Course.find().populate("preRequisiteCourses.course");
  const courseQuery = new QueryBuilder(defaultQuery, query)
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .filterFields();
  const result = await courseQuery.modelQuery;
  const countTotal = await courseQuery.countTotal();
  return { meta: countTotal, data: result };
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

const deleteSingleCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const updatedSingleCourseIntoDB = async (
  id: string,
  payload: Partial<TCourse>,
) => {
  const { preRequisiteCourses, ...remainingCourseData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // updating primitive course information
    const updatedPrimitiveDataOfCourseInfo = await Course.findByIdAndUpdate(
      id,
      remainingCourseData,
      { new: true, runValidators: true, session: session },
    );

    if (!updatedPrimitiveDataOfCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
    }

    // checking if there any data sent in preRequisiteCourses from frontEnd

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filtering out fields that will be deleted
      const deletePreRequisites = preRequisiteCourses
        .filter((field) => field.course && field.isDeleted)
        .map((el) => el.course);

      const addPreRequisites = preRequisiteCourses.filter(
        (field) => field.course && !field.isDeleted,
      );

      const addedPreRequisites = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisiteCourses: { $each: addPreRequisites },
          },
        },
        {
          new: true,
          runValidators: true,
          session: session,
        },
      );

      if (!addedPreRequisites) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
      }

      const deletedPreRequisites = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletePreRequisites } },
          },
        },
        { new: true, runValidators: true, session: session },
      );

      if (!deletedPreRequisites) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
      }
    }
    await session.commitTransaction();
    await session.endSession();
    const result = await Course.findById(id).populate(
      "preRequisiteCourses.course",
    );
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      error.message || "Failed to update course",
    );
  }
};

const assignFacultiesToCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculties>,
) => {
  if (!(await Course.findById(id))) {
    throw new AppError(httpStatus.BAD_REQUEST, "Course doesn't exist");
  }

  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: {
        faculties: { $each: payload },
      },
    },
    { upsert: true, new: true },
  );
  return result;
};

const removeFacultiesFromCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculties>,
) => {
  if (!(await Course.findById(id))) {
    throw new AppError(httpStatus.BAD_REQUEST, "Course doesn't exist");
  }

  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: {
        faculties: { $in: payload },
      },
    },
    { new: true },
  );
  return result;
};

export const courseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteSingleCourseFromDB,
  updatedSingleCourseIntoDB,
  assignFacultiesToCourseIntoDB,
  removeFacultiesFromCourseIntoDB,
};
