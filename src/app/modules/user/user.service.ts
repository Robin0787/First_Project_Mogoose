import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import config from "../../config";
import { AppError } from "../../errors/AppError";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";
import { TFaculty } from "../faculty/faculty.interface";
import { Faculty } from "../faculty/faculty.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { USER_ROLE } from "./user.constant";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.utils";

const createStudentToDB = async (
  password: string,
  payload: TStudent,
  file: any,
) => {
  // create user object
  const userData: Partial<TUser> = {
    id: "",
    email: payload.email,
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

    const image_name = `${payload?.name?.firstName}-${userData?.id}`;

    const uploadedImageData: any = await sendImageToCloudinary(
      file?.path,
      image_name,
    );

    payload.profileImage = uploadedImageData?.secure_url;

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

const createFacultyToDB = async (password: string, payload: TFaculty) => {
  // create user object
  const userData: Partial<TUser> = {
    id: "",
    email: payload.email,
    password: password || (config.default_pass as string),
    role: "faculty",
  };

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "academicDepartment is not found!!",
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // generating faculty id
    userData.id = await generateFacultyId();

    const createdFacultyUser = await User.create([userData], { session });

    if (!createdFacultyUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user!!");
    }

    payload.id = createdFacultyUser[0].id;
    payload.user = createdFacultyUser[0]._id;

    const createdFaculty = await Faculty.create([payload], { session });

    if (!createdFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Faculty!!");
    }
    await session.commitTransaction();
    await session.endSession();
    return createdFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      err.message || "Something went wrong!!",
    );
  }
};

const createAdminToDB = async (password: string, payload: TAdmin) => {
  // create user object
  const userData: Partial<TUser> = {
    id: "",
    email: payload.email,
    password: password || (config.default_pass as string),
    role: "admin",
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await generateAdminId();

    // creating a user with transaction
    const createdUser = await User.create([userData], { session });

    if (!createdUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user!!");
    }

    payload.id = createdUser[0].id;
    payload.user = createdUser[0]._id;
    // creating a student with transaction
    const createdAdmin = await Admin.create([payload], { session });
    if (!createdAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin!!");
    }
    await session.commitTransaction();
    await session.endSession();
    return createdAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      err.message || "Something went wrong!!",
    );
  }
};

const getMe = async (payload: JwtPayload) => {
  const { id, role } = payload;

  let result = null;
  if (role === USER_ROLE.student) {
    result = await Student.findOne({ id })
      .populate("admissionSemester")
      .populate({
        path: "academicDepartment",
        populate: {
          path: "academicFaculty",
        },
      });
  } else if (role === USER_ROLE.faculty) {
    result = await Faculty.findOne({ id });
  } else if (role === USER_ROLE.admin) {
    result = await Admin.findOne({ id });
  }

  return result;
};

const changeUserStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const userServices = {
  createStudentToDB,
  createFacultyToDB,
  createAdminToDB,
  getMe,
  changeUserStatus,
};
