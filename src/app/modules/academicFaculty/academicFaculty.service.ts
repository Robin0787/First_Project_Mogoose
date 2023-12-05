import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyToDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find({});
  return result;
};

const getSingleAcademicFacultiesFromDB = async (facultyId: string) => {
  if (!(await AcademicFaculty.isAcademicFacultyExists(facultyId))) {
    throw new AppError(httpStatus.NOT_FOUND, "This Faculty doesn't exist!!");
  }
  const result = await AcademicFaculty.findById(facultyId);
  return result;
};

const updateFacultyFromDB = async (
  facultyId: string,
  payload: TAcademicFaculty,
) => {
  if (!(await AcademicFaculty.isAcademicFacultyExists(facultyId))) {
    throw new AppError(httpStatus.NOT_FOUND, "This Faculty doesn't exist!!");
  }
  const result = await AcademicFaculty.updateOne(
    { _id: facultyId },
    { ...payload },
  );
  return result;
};

export const academicFacultyServices = {
  createAcademicFacultyToDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultiesFromDB,
  updateFacultyFromDB,
};
