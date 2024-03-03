import { Model, Types } from "mongoose";

export type TStudentName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TGender = "Male" | "Female";

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type BloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "O+"
  | "O-"
  | "AB+"
  | "AB-";

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export interface TStudent {
  id: string;
  user: Types.ObjectId;
  name: TStudentName;
  email: string;
  gender: TGender;
  dateOfBirth?: Date;
  contactNo: string;
  emergencyContactNo: string;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  bloodGroup?: BloodGroup;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  isDeleted?: boolean;
}

export interface StudentModel extends Model<TStudent> {
  isStudentExists(id: string): Promise<TStudent | null>;
}
