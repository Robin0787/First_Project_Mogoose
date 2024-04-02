import httpStatus from "http-status";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { AppError } from "../../errors/AppError";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { OfferedCourse } from "../offeredCourse/offeredCourse.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { Student } from "../student/student.model";
import { calculatedGradeAndPoints } from "./enrolled.course.utils";
import { TEnrolledCourse } from "./enrolledCourse.interface";
import { EnrolledCourse } from "./enrolledCourse.model";

const createEnrolledCourseIntoDB = async (
  offeredCourseId: string,
  userId: string,
) => {
  /*
   * 1. Check if the offered course is exists or not
   * 2. Check if the student is already enrolled or not
   * 3. Create an enrolled course for the student
   */

  const offeredCourse = await OfferedCourse.findById(offeredCourseId);
  if (!offeredCourse) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered course not found!");
  }

  if (offeredCourse.maxCapacity <= 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "No sits are available to this course",
    );
  }

  const student = await Student.findOne({ id: userId }, { _id: 1 });

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found!");
  }

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: offeredCourse?.semesterRegistration,
    offeredCourse: offeredCourseId,
    student: student?._id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(
      httpStatus.CONFLICT,
      "Student is already enrolled to this course!",
    );
  }

  const enrollCourseData: TEnrolledCourse = {
    semesterRegistration: offeredCourse.semesterRegistration,
    academicSemester: offeredCourse.academicSemester,
    academicFaculty: offeredCourse.academicFaculty,
    academicDepartment: offeredCourse.academicDepartment,
    offeredCourse: offeredCourse._id,
    course: offeredCourse.course,
    student: student._id,
    faculty: offeredCourse.faculty,
  };

  const semesterRegistration = await SemesterRegistration.findById(
    offeredCourse.semesterRegistration,
  ).select("maxCredit");

  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: offeredCourse?.semesterRegistration,
        student: student._id,
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "course",
        foreignField: "_id",
        as: "enrolledCourseData",
      },
    },
    {
      $unwind: "$enrolledCourseData",
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: "$enrolledCourseData.credits" },
      },
    },
    {
      $project: { _id: 0, totalEnrolledCredits: 1 },
    },
  ]);

  const totalEnrolledCourseCredits = enrolledCourses[0]?.totalEnrolledCredits;

  const currentCourse = await Course.findById(offeredCourse.course);
  const currentCourseCredits = currentCourse!.credits as number;

  if (
    totalEnrolledCourseCredits + currentCourseCredits >
    (semesterRegistration?.maxCredit as number)
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have exceeded maximum number of credits required for this course.",
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await EnrolledCourse.create([enrollCourseData], { session });
    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to enroll in this course",
      );
    }

    const maxCapacity = offeredCourse.maxCapacity;
    await OfferedCourse.findByIdAndUpdate(
      offeredCourseId,
      {
        maxCapacity: maxCapacity - 1,
      },
      { session },
    );

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMyEnrolledCoursesFromDB = async (
  studentId: string,
  query: Record<string, unknown>,
) => {
  const student = await Student.findOne({ id: studentId }).select("_id");
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "Student doesn't exist");
  }

  const modelQueryForBuilder = EnrolledCourse.find({
    student: student._id,
  })
    .populate("course")
    .populate("semesterRegistration")
    .populate("academicSemester")
    .populate("academicFaculty")
    .populate("academicDepartment")
    .populate("offeredCourse")
    .populate("faculty")
    .populate("student");

  const studentQuery = new QueryBuilder(modelQueryForBuilder, query)
    .filter()
    .sort()
    .paginate()
    .filterFields();
  const result = await studentQuery.modelQuery;
  const countTotal = await studentQuery.countTotal();
  return { meta: countTotal, data: result };
};

const updateEnrolledCourseMarksIntoDB = async (
  userId: string,
  payload: Partial<TEnrolledCourse>,
) => {
  const { semesterRegistration, offeredCourse, student, courseMarks } = payload;

  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration).select("_id");

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This semester doesn't exist");
  }

  const isOfferedCourseExists =
    await OfferedCourse.findById(offeredCourse).select("_id");

  if (!isOfferedCourseExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This Offered Course doesn't exist",
    );
  }
  const isStudentExists = await Student.findById(student).select("_id");

  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This Student doesn't exist");
  }

  const faculty = await Faculty.findOne({ id: userId }).select("_id");

  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, "This Faculty doesn't exist");
  }

  const enrolledCourse = await EnrolledCourse.findOne({
    semesterRegistration,
    offeredCourse,
    student,
    faculty: faculty._id,
  });

  const isThisCourseBelongsToThisFaculty = enrolledCourse
    ? enrolledCourse
    : false;
  if (!isThisCourseBelongsToThisFaculty) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "This course doesn't belong to this faculty",
    );
  }

  const modifiedData: Record<string, unknown> = {};
  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value;
    }
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid course marks");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updatedEnrolledCourse = await EnrolledCourse.findByIdAndUpdate(
      enrolledCourse?._id,
      modifiedData,
      { new: true, session },
    );

    if (courseMarks?.finalTerm) {
      const marksOfCourse = updatedEnrolledCourse!.courseMarks;

      const totalMarks =
        Math.ceil(marksOfCourse!.classTest1 * 0.1) +
        Math.ceil(marksOfCourse!.midTerm * 0.3) +
        Math.ceil(marksOfCourse!.classTest2 * 0.1) +
        Math.ceil(marksOfCourse!.finalTerm * 0.5);

      const calculatedResult = calculatedGradeAndPoints(totalMarks);

      const result = await EnrolledCourse.findByIdAndUpdate(
        enrolledCourse?._id,
        {
          grade: calculatedResult.grade,
          gradePoints: calculatedResult.gradePoints,
          isCompleted: true,
        },
        { new: true, session },
      );
      await session.commitTransaction();
      await session.endSession();
      return result;
    }

    await session.commitTransaction();
    await session.endSession();
    return updatedEnrolledCourse;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.FORBIDDEN, "Failed to update course marks");
  }
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  getMyEnrolledCoursesFromDB,
  updateEnrolledCourseMarksIntoDB,
};
