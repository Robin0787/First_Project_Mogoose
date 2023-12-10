import { Schema, model } from "mongoose";
import { TFaculty } from "./faculty.interface";

const facultySchema = new Schema<TFaculty>(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: false,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      required: false,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: false,
    },
    isDeleted: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Faculty = model<TFaculty>("faculty", facultySchema);
