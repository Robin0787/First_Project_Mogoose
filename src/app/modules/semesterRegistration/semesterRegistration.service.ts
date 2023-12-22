import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { AppError } from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // checking if there are any ONGOING or UPCOMING courses available or not
  const isThereAnyUpcomingOrOngoingSemesterAvailable =
    await SemesterRegistration.findOne({
      _id: academicSemester,
      $or: [{ status: "UPCOMING" }, { status: "ONGOING" }],
    });
  if (isThereAnyUpcomingOrOngoingSemesterAvailable) {
    throw new AppError(
      httpStatus.CONFLICT,
      `There is already an ${isThereAnyUpcomingOrOngoingSemesterAvailable.status} course registered for this semester`,
    );
  }

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

const getAllSemesterRegistrationFromDB = async (
  payload: Record<string, unknown>,
) => {
  const query = SemesterRegistration.find().populate("academicSemester");
  const semesterRegistrationQuery = new QueryBuilder(query, payload)
    .filter()
    .sort()
    .paginate()
    .filterFields();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Semester Registration doesn't exist",
    );
  }
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: TSemesterRegistration,
) => {
  const requestedSemester = await SemesterRegistration.findById(id);

  if (!requestedSemester) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Semester Registration doesn't exist",
    );
  }
  if (requestedSemester?.status === "ENDED") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This semester is already ENDED",
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};