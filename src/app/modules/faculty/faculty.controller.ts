import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { facultyServices } from "./faculty.service";

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await facultyServices.getAllFacultiesFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Faculties are retrieved successfully",
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await facultyServices.getSingleFacultyFromDB(facultyId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Faculty is retrieved successfully",
    data: result,
  });
});

export const facultyControllers = {
  getAllFaculties,
  getSingleFaculty,
};
