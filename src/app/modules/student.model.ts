import { Schema, model } from "mongoose";
import {
  Guardian,
  LocalGuardian,
  Student,
  StudentName,
} from "./student/student.interface";

const studentNameSchema = new Schema<StudentName>({
  firstName: { type: String, required: [true, "firstName is required"] },
  middleName: { type: String },
  lastName: { type: String, required: [true, "lastName is required"] },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentScheme = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: {
    type: studentNameSchema,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  gender: {
    type: String,
    enum: {
      values: ["Male", "Female"],
      message: "{VALUE} is not a valid value for gender",
    },
    required: [true, "gender is required"],
  },
  dateOfBirth: { type: String },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImage: { type: String },
  isActive: {
    type: String,
    enum: ["Active", "Blocked"],
    default: "Active",
  },
});

export const StudentModel = model("student", studentScheme);
