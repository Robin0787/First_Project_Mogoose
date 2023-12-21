import { Schema, model } from "mongoose";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";
import { TSemesterRegistration } from "./semesterRegistration.interface";

const semesterRegistrationSchema = new Schema<TSemesterRegistration>({
  academicSemester: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: true,
    ref: "academicSemester",
  },
  status: {
    type: String,
    enum: SemesterRegistrationStatus,
    default: "UPCOMING",
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  minCredit: {
    type: Number,
    required: true,
  },
  maxCredit: {
    type: Number,
    required: true,
  },
});

export const SemesterRegistration = model<TSemesterRegistration>(
  "semesterRegistration",
  semesterRegistrationSchema,
);
