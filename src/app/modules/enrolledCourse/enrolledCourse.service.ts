import httpStatus from "http-status";
import mongoose from "mongoose";
import { AppError } from "../../errors/AppError";
import { OfferedCourse } from "../offeredCourse/offeredCourse.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { Student } from "../student/student.model";
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
  ]);

  const totalEnrolledCredits = enrolledCourses[0]?.totalEnrolledCredits;

  if (totalEnrolledCredits > (semesterRegistration?.maxCredit as number)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Your credits doesn't allow you to enroll in this course.",
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

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
};
