import { Types } from "mongoose";

export type TPreRequisiteCourse = {
  course: Types.ObjectId;
  isDeleted: Boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: [TPreRequisiteCourse];
  isDeleted: Boolean;
};
