import { Schema, model } from "mongoose";
import { TCourse, TPreRequisiteCourse } from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourse>(
  {
    course: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "course",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "title is required"],
    },
    prefix: {
      type: String,
      trim: true,
      required: [true, "prefix is required"],
    },
    code: {
      type: Number,
      required: [true, "code is required"],
    },
    credits: {
      type: Number,
      required: [true, "credits is required"],
    },
    preRequisiteCourses: {
      type: [preRequisiteCoursesSchema],
      required: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  { timestamps: true },
);

export const Course = model<TCourse>("course", courseSchema);
