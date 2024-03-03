import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { student: studentData, password } = req.body;
  const result = await userServices.createStudentToDB(
    password,
    studentData,
    req.file,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Student is created successfully",
    data: result,
  });
});

const createFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { faculty: facultyData, password } = req.body;
  const result = await userServices.createFacultyToDB(
    password,
    facultyData,
    req.file,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Faculty is created successfully",
    data: result,
  });
});

const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { admin: adminData, password } = req.body;
  const result = await userServices.createAdminToDB(
    password,
    adminData,
    req.file,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Admin is created successfully",
    data: result,
  });
});

const getMe: RequestHandler = catchAsync(async (req, res) => {
  const result = await userServices.getMe(req.user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `${req?.user?.role} is retrieved successfully`,
    data: result,
  });
});

const changeUserStatus: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.changeUserStatus(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `user status is changed successfully`,
    data: result,
  });
});

export const userControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeUserStatus,
};
