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

export const facultyControllers = {
  getAllFaculties,
};
