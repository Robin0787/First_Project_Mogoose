import { TSemesterRegistration } from "./semesterRegistration.interface";

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {};

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
