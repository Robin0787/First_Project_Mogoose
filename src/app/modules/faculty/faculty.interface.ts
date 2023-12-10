import { Types } from "mongoose";

export type BloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "O+"
  | "O-"
  | "AB+"
  | "AB-";

export type TGender = "Male" | "Female";
export interface TFaculty {
  id: string;
  name: string;
  designation: string;
  email: string;
  gender: TGender;
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  bloodGroup?: BloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  isDeleted?: string;
}
