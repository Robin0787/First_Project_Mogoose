import httpStatus from "http-status";
import mongoose from "mongoose";
import { AppError } from "../../errors/AppError";
import { User } from "../user/user.model";
import { Student } from "./student.model";

const getAllStudents = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const getSingleStudent = async (id: string) => {
  if (!(await Student.isStudentExists(id))) {
    throw new AppError(httpStatus.NOT_FOUND, "Student doesn't exist!!");
  }
  const result = await Student.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const deleteSingleStudentFromDB = async (id: string) => {
  if (!(await Student.isStudentExists(id))) {
    throw new AppError(httpStatus.NOT_FOUND, "Student doesn't exist!!");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student!");
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user!");
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Something went wrong!!");
  }
};

export const studentServices = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudentFromDB,
};
