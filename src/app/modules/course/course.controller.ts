import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
  const { course } = req.body;
  const result = await courseServices.createCourseIntoDB(course);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course is created successfully",
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCoursesFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Courses are retrieved successfully",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.getSingleCourseFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course is retrieved successfully",
    data: result,
  });
});

const deleteSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.deleteSingleCourseFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course is deleted successfully",
    data: result,
  });
});

const updatedSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { course } = req.body;
  const result = await courseServices.updatedSingleCourseIntoDB(id, course);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course is updated successfully",
    data: result,
  });
});

export const courseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteSingleCourse,
  updatedSingleCourse,
};
