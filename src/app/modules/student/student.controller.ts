import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { studentServices } from "./student.service";

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudents(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Students are retrieve successfully.",
    meta: result?.meta,
    data: result?.data,
  });
});

const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await studentServices.getSingleStudent(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Student is retrieve successfully.",
    data: result,
  });
});

const updatedStudent: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student: studentData } = req.body;
  const result = await studentServices.updatedStudentIntoDB(id, studentData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Student is updated successfully.",
    data: result,
  });
});

const deleteSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await studentServices.deleteSingleStudentFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Student is deleted successfully.",
    data: result,
  });
});

export const studentControllers = {
  getAllStudents,
  getSingleStudent,
  updatedStudent,
  deleteSingleStudent,
};
