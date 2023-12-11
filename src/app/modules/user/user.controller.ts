import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const { student: studentData, password } = req.body;
  const result = await userServices.createStudentToDB(password, studentData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Student created successfully",
    data: result,
  });
});

const createFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { faculty: facultyData, password } = req.body;
  const result = await userServices.createFacultyToDB(password, facultyData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Faculty is created successfully",
    data: result,
  });
});

export const userControllers = {
  createUser,
  createFaculty,
};
