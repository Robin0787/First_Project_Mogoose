import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";

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
  return result;
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
  console.log({ id, payload });
};

export const courseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteSingleCourseFromDB,
  updatedSingleCourseIntoDB,
};
