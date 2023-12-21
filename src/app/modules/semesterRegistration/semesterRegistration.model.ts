import { Schema, model } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";

const semesterRegistrationSchema = new Schema<TSemesterRegistration>({
  academicSemester: {
    type: Schema.Types.ObjectId,
  },
});

export const SemesterRegistration = model<TSemesterRegistration>(
  "semesterRegistration",
  semesterRegistrationSchema,
);
