import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../../config";
import { AppError } from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentToDB = async (password: string, payload: TStudent) => {
  // create user object
  const userData: Partial<TUser> = {
    id: "",
    password: password || (config.default_pass as string),
    role: "student",
  };

  // getting academic semester information
  const academicSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // setting users id
    userData.id = await generateStudentId(academicSemester);

    // creating a user with transaction
    const createdUser = await User.create([userData], { session });

    if (!createdUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user!!");
    }

    payload.id = createdUser[0].id;
    payload.user = createdUser[0]._id;
    // creating a student with transaction
    const createdStudent = await Student.create([payload], { session });
    if (!createdStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student!!");
    }
    await session.commitTransaction();
    await session.endSession();
    return createdStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      err.message || "Something went wrong!!",
    );
  }
};

export const userServices = {
  createStudentToDB,
};
