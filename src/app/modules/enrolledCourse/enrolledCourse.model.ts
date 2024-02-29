import { Schema, model } from "mongoose";
import { Grade } from "./enrolledCourse.constant";
import { TCourseMarks, TEnrolledCourse } from "./enrolledCourse.interface";

const courseMarksSchema = new Schema<TCourseMarks>({
  classTest1: {
    type: Number,
    default: 0,
  },
  midTerm: {
    type: Number,
    default: 0,
  },
  classTest2: {
    type: Number,
    default: 0,
  },
  finalTerm: {
    type: Number,
    default: 0,
  },
});

const enrolledCourseSchema = new Schema<TEnrolledCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "SemesterRegistration",
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "AcademicSemester",
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "AcademicFaculty",
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "AcademicDepartment",
  },
  offeredCourse: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "OfferedCourse",
  },
  course: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Course",
  },
  student: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Student",
  },
  faculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "faculty",
  },
  isEnrolled: {
    type: Boolean,
    required: false,
    default: true,
  },
  courseMarks: {
    type: courseMarksSchema,
    required: false,
    default: {},
  },
  grade: {
    type: String,
    required: false,
    enum: {
      values: Grade,
    },
    default: "N/A",
  },
  gradePoints: {
    type: Number,
    required: false,
    min: 0,
    max: 4,
    default: 0,
  },
  isCompleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});

export const EnrolledCourse = model<TEnrolledCourse>(
  "enrolledCourse",
  enrolledCourseSchema,
);
