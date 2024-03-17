import httpStatus from "http-status";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { AppError } from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { OfferedCourse } from "../offeredCourse/offeredCourse.model";
import { RegistrationStatus } from "./semesterRegistration.constant";
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
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
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
      "This semester is already registered",
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

  if (payload.minCredit < 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Min credit can't be smaller than 0",
    );
  }
  if (payload.maxCredit <= 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Max credit must be greater than 0",
    );
  }

  if (payload.minCredit > payload.maxCredit) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Max credit must be greater than Min credit",
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
  const countTotal = await semesterRegistrationQuery.countTotal();
  return { meta: countTotal, data: result };
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

  const requestedSemesterStatus = requestedSemester?.status;
  const currentSemesterStatus = payload?.status;

  if (!requestedSemester) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Semester Registration doesn't exist",
    );
  }
  if (requestedSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This semester is already ENDED",
    );
  }

  if (
    requestedSemesterStatus === RegistrationStatus.UPCOMING &&
    currentSemesterStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't directly update the status from ${requestedSemesterStatus} to ${currentSemesterStatus}!`,
    );
  }

  if (
    requestedSemesterStatus === RegistrationStatus.ONGOING &&
    currentSemesterStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't directly update the status from ${requestedSemesterStatus} to ${currentSemesterStatus}!`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSemesterRegistrationFromDB = async (id: string) => {
  const isSemesterRegistrationExist = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This semesterRegistration doesn't exist!",
    );
  }
  const semesterRegistrationStatus = isSemesterRegistrationExist?.status;

  if (semesterRegistrationStatus !== "UPCOMING") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semesterRegistration can't be deleted as it's status is ${semesterRegistrationStatus}`,
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deleteAllTheOfferedCoursesWithSemesterRegistrationId =
      await OfferedCourse.deleteMany({ semesterRegistration: id });

    if (!deleteAllTheOfferedCoursesWithSemesterRegistrationId) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to delete semesterRegistration",
      );
    }

    const deleteSemesterRegistration = await SemesterRegistration.deleteOne({
      _id: id,
    });
    if (!deleteSemesterRegistration) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to delete semesterRegistration",
      );
    }
    await session.commitTransaction();
    await session.endSession();
    return deleteSemesterRegistration;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Failed to delete semesterRegistration",
    );
  }
};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};
