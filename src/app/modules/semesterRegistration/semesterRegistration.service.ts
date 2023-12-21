import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  // checking the academicSemester already exists or not
  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This academicSemester is already exists",
    );
  }

  // checking the given academicSemester is valid or not
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This academicSemester doesn't exist",
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async () => {};

const getSingleSemesterRegistrationFromDB = async (id: string) => {};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: TSemesterRegistration,
) => {};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
