import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { RegistrationStatus } from "../semesterRegistration/semesterRegistration.constant";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TSchedule } from "./offeredCourse.constant";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { hasTimeConflict } from "./offeredCourse.utils";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  // check if the semesterRegistration is exist
  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This semesterRegistration doesn't exist!",
    );
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  // check if the academicFaculty is exist
  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This academicFaculty doesn't exist!",
    );
  }

  // check if the academicDepartment is exist
  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This academicDepartment doesn't exist!",
    );
  }

  // check if the course is exist
  const isCourseExists = await Course.findById(course);
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This course doesn't exist!");
  }
  // check if the faculty is exist
  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "This faculty doesn't exist!");
  }

  // check the facultyDepartment belongs to the academicFaculty
  const isDepartmentBelongsToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongsToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This facultyDepartment doesn't belongs to this academicFaculty",
    );
  }

  // check if the same offered course same section in same registered semester exists

  const isSameOfferedCourseExistWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({ semesterRegistration, course, section });

  if (isSameOfferedCourseExistWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Offered course with same section is already exist",
    );
  }

  // make sure the same faculty is not taking the class as the same time in two courses
  const assignedSchedules: TSchedule[] = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule: TSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This Faculty is not available for this schedule. Choose other time or day",
    );
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const getAllOfferedCourseFromDB = async () => {
  const result = await OfferedCourse.find();
  return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This offered course doesn't exist!",
    );
  }
  return result;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<
    TOfferedCourse,
    "faculty" | "days" | "maxCapacity" | "startTime" | "endTime"
  >,
) => {
  const { faculty, days, startTime, endTime } = payload;

  // check the course is exist or not
  const isOfferedCourseExist = await OfferedCourse.findById(id);
  if (!isOfferedCourseExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This offered course doesn't exist!",
    );
  }

  // check the faculty is exist
  const isFacultyExist = await Faculty.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "This faculty is not found!");
  }

  // check if the semesterRegistration course status is UPCOMING
  const semesterRegistration = isOfferedCourseExist.semesterRegistration;
  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== RegistrationStatus.UPCOMING) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't update this offered course as its status is ${semesterRegistrationStatus?.status}`,
    );
  }

  const assignedSchedules: TSchedule[] = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  });

  const newSchedule: TSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This Faculty is not available for this schedule. Choose other time or day",
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const offeredCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};
