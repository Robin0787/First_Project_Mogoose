import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { AppError } from "../../errors/AppError";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentToDB = async (
  departmentData: TAcademicDepartment,
) => {
  const result = await AcademicDepartment.create(departmentData);
  return result;
};

const getAllAcademicDepartmentFromDB = async (
  query: Record<string, unknown>,
) => {
  const modelQueryForBuilder =
    AcademicDepartment.find().populate("academicFaculty");
  const academicDepartmentQuery = new QueryBuilder(modelQueryForBuilder, query)
    .filter()
    .sort()
    .paginate()
    .filterFields();
  const result = await academicDepartmentQuery.modelQuery;
  const countTotal = await academicDepartmentQuery.countTotal();
  return { meta: countTotal, data: result };
};

const getSingleAcademicDepartmentFromDB = async (departmentId: string) => {
  if (!(await AcademicDepartment.isDepartmentExists(departmentId))) {
    throw new AppError(httpStatus.NOT_FOUND, "This Department doesn't exist!!");
  }
  const result =
    await AcademicDepartment.findById(departmentId).populate("academicFaculty");
  return result;
};

const updateAcademicDepartmentToDB = async (
  departmentId: string,
  departmentData: Partial<TAcademicDepartment>,
) => {
  if (!(await AcademicDepartment.isDepartmentExists(departmentId))) {
    throw new AppError(httpStatus.NOT_FOUND, "This Department doesn't exist!!");
  }
  const result = await AcademicDepartment.findByIdAndUpdate(
    { _id: departmentId },
    { ...departmentData },
    { new: true },
  );
  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartmentToDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentToDB,
};
