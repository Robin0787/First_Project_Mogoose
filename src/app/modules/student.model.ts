import { Schema, model } from "mongoose";
import {
  Guardian,
  LocalGuardian,
  Student,
  StudentName,
} from "./student/student.interface";

const studentNameSchema = new Schema<StudentName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
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
  id: { type: String, required: true },
  name: studentNameSchema,
  email: { type: String, required: true },
  gender: ["Male", "Female"],
  dateOfBirth: { type: String },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImage: { type: String },
  isActive: ["Active", "Blocked"],
});

export const StudentModel = model("student", studentScheme);
