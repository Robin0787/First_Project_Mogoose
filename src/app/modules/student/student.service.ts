import httpStatus from "http-status";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { AppError } from "../../errors/AppError";
import { User } from "../user/user.model";
import { studentSearchableFields } from "./student.constant";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";

// const getAllStudents = async (query: Record<string, unknown>) => {
//   const studentSearchableFields = ["email", "name.firstName", "presentAddress"];

//   let searchTerm = "";
//   if (query?.searchTerm) {
//     searchTerm = query?.searchTerm as string;
//   }

//   const searchQuery = Student.find({
//     $or: studentSearchableFields.map((field) => ({
//       [field]: { $regex: searchTerm, $options: "i" },
//     })),
//   });

//   const copyQueryObj = { ...query };

//   const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
//   excludeFields.forEach((el) => delete copyQueryObj[el]);

//   const filterQuery = searchQuery
//     .find(copyQueryObj)
//     .populate("admissionSemester")
//     .populate({
//       path: "academicDepartment",
//       populate: {
//         path: "academicFaculty",
//       },
//     });

//   let sort = "-createdAt";
//   if (query.sort) {
//     sort = query?.sort as string;
//   }
//   const sortQuery = filterQuery.sort(sort);

//   let page = 1;
//   let limit = 1;
//   let skip = 0;

//   if (query.limit) {
//     limit = Number(query?.limit);
//   }

//   if (query.page) {
//     page = Number(query?.page);
//     skip = (page - 1) * limit;
//   }

//   const skipQuery = sortQuery.skip(skip);

//   const limitQuery = skipQuery.limit(limit);

//   // field limiting

//   let fields = "-__v";

//   if (query.fields) {
//     fields = (query?.fields as string).split(",").join(" ");
//   }

//   const fieldsQuery = await limitQuery.select(fields);

//   return fieldsQuery;
// };

const getAllStudents = async (query: Record<string, unknown>) => {
  const modelQueryForBuilder = Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });

  const studentQuery = new QueryBuilder(modelQueryForBuilder, query)
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .filterFields();
  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudent = async (_id: string) => {
  if (!(await Student.isStudentExists(_id))) {
    throw new AppError(httpStatus.NOT_FOUND, "Student doesn't exist!!");
  }
  const result = await Student.findById(_id)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const updatedStudentIntoDB = async (
  _id: string,
  payload: Partial<TStudent>,
) => {
  if (!(await Student.isStudentExists(_id))) {
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

  const result = await Student.findByIdAndUpdate(_id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSingleStudentFromDB = async (_id: string) => {
  if (!(await Student.isStudentExists(_id))) {
    throw new AppError(httpStatus.NOT_FOUND, "Student doesn't exist!!");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findByIdAndUpdate(
      _id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student!");
    }

    const userId = deletedStudent.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student!");
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error: any) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      error.message || "Failed to delete student!",
    );
  }
};

export const studentServices = {
  getAllStudents,
  getSingleStudent,
  updatedStudentIntoDB,
  deleteSingleStudentFromDB,
};
