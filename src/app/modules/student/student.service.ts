import httpStatus from "http-status";
import mongoose from "mongoose";
import { AppError } from "../../errors/AppError";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const getAllStudents = async (query: Record<string, unknown>) => {
  const studentSearchableFields = ["email", "name.firstName", "presentAddress"];

  let searchTerm = "";
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  const copyQueryObj = { ...query };

  const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
  excludeFields.forEach((el) => delete copyQueryObj[el]);

  const filterQuery = searchQuery
    .find(copyQueryObj)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });

  let sort = "-createdAt";
  if (query.sort) {
    sort = query?.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);

  let page = 1;
  let limit = 1;
  let skip = 0;

  if (query.limit) {
    limit = Number(query?.limit);
  }

  if (query.page) {
    page = Number(query?.page);
    skip = (page - 1) * limit;
  }

  const paginatedQuery = sortQuery.skip(skip);

  const limitQuery = paginatedQuery.limit(limit);

  // field limiting

  let fields = "-_v";

  if (query.fields) {
    fields = (query?.fields as string).split(",").join(" ");
  }

  const fieldsQuery = await limitQuery.select(fields);

  return fieldsQuery;
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

const updatedStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  if (!(await Student.isStudentExists(id))) {
    throw new AppError(httpStatus.NOT_FOUND, "Student doesn't exist!!");
  }
  // change the student data to don't mutate in Database
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  // modified data will be stored in this variable
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
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
  updatedStudentIntoDB,
  deleteSingleStudentFromDB,
};
