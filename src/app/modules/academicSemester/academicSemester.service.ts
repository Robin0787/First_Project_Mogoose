import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { AppError } from "../../errors/AppError";
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

export type TAcademicSemesterNameCodeMapper = {
  [key: string]: string;
};

const createAcademicSemesterToDB = async (
  academicSemesterData: TAcademicSemester,
) => {
  // business logic
  // check if the semester name is align with it's code or not.
  if (
    academicSemesterNameCodeMapper[academicSemesterData.name] !==
    academicSemesterData.code
  ) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Invalid semester code!!",
    );
  }

  const result = await AcademicSemester.create(academicSemesterData);
  return result;
};

const getAllSemesterFromDB = async (query: Record<string, unknown>) => {
  const modelQueryForBuilder = AcademicSemester.find();
  const academicSemesterQuery = new QueryBuilder(modelQueryForBuilder, query)
    .filter()
    .sort()
    .paginate()
    .filterFields();
  const result = await academicSemesterQuery.modelQuery;
  const countTotal = await academicSemesterQuery.countTotal();
  return { meta: countTotal, data: result };
};

const getSingleSemesterFromDB = async (semesterId: string) => {
  if (!(await AcademicSemester.isAcademicSemesterExists(semesterId))) {
    throw new AppError(httpStatus.NOT_FOUND, "This Semester doesn't exist!!");
  }
  const result = await AcademicSemester.findOne({
    _id: semesterId,
  });
  return result;
};

const updateSingleSemesterInDB = async (
  semesterId: string,
  semesterData: Partial<TAcademicSemester>,
) => {
  if (!(await AcademicSemester.isAcademicSemesterExists(semesterId))) {
    throw new AppError(httpStatus.NOT_FOUND, "This Semester doesn't exist!!");
  }
  if (
    semesterData.name &&
    semesterData.code &&
    academicSemesterNameCodeMapper[semesterData.name] !== semesterData.code
  ) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Invalid semester code!!",
    );
  }

  const result = await AcademicSemester.updateOne(
    {
      _id: semesterId,
    },
    { $set: { ...semesterData } },
    { new: true },
  );
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterToDB,
  getAllSemesterFromDB,
  getSingleSemesterFromDB,
  updateSingleSemesterInDB,
};
