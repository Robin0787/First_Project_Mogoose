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
    throw new Error("Invalid semester code!!");
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

const updateSingleSemesterInDB = async (
  semesterId: string,
  semesterData: Partial<TAcademicSemester>,
) => {
  if (
    semesterData.name &&
    semesterData.code &&
    academicSemesterNameCodeMapper[semesterData.name] !== semesterData.code
  ) {
    throw new Error("Invalid semester code!!");
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
