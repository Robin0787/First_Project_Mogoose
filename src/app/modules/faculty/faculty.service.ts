import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { Faculty } from "./faculty.model";

const getAllFacultiesFromDB = async () => {
  const result = await Faculty.find()
    .populate("academicDepartment")
    .populate("academicFaculty")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Faculty doesn't exist");
  }
  return result;
};

export const facultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
};
