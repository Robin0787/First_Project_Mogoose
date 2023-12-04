import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentToDB = async (
  departmentData: TAcademicDepartment,
) => {
  const result = await AcademicDepartment.create(departmentData);
  return result;
};

const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find({}).populate("academicFaculty");
  return result;
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
