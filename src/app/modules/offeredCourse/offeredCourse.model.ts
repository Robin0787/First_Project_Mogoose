import { Schema, model } from "mongoose";
import { Days } from "./offeredCourse.constant";
import { TOfferedCourse } from "./offeredCourse.interface";

const offeredCourseSchema = new Schema<TOfferedCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "semesterRegistration",
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "academicSemester",
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "academicFaculty",
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "academicDepartment",
  },
  course: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "course",
  },
  faculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "faculty",
  },
  maxCapacity: {
    type: Number,
  },
  section: {
    type: Number,
  },
  days: [
    {
      type: String,
      enum: Days,
    },
  ],
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
});

export const OfferedCourse = model<TOfferedCourse>(
  "offeredCourse",
  offeredCourseSchema,
);
