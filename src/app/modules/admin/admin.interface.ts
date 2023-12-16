import { Types } from "mongoose";

export type TAdminName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TBloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "O+"
  | "O-"
  | "AB+"
  | "AB-";

export type TGender = "Male" | "Female";

export interface TAdmin {
  id: string;
  user: Types.ObjectId;
  name: TAdminName;
  designation: string;
  email: string;
  gender: TGender;
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  managementDepartment: Types.ObjectId;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  isDeleted?: string;
}
