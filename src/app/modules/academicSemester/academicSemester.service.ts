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
    throw new Error("Semester code is not valid!!");
  }

  const result = await AcademicSemester.create(academicSemesterData);
  return result;
};

const getAllSemesterFromDB = async () => {
  const result = await AcademicSemester.find({});
  return result;
};

const getSingleSemesterFromDB = async (semesterId: string) => {
  const result = await AcademicSemester.findOne({
    _id: semesterId,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterToDB,
  getAllSemesterFromDB,
  getSingleSemesterFromDB,
};
