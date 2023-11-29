import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { student: studentData, password } = req.body;

    // const zodParsedUserData = userValidation.userValidationSchema.parse(password);

    // data validation with Zod library
    // const zodParsedData = studentValidationSchemaWithZod.parse(studentData);

    const result = await userServices.createStudentToDB(password, studentData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Student created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userControllers = {
  createUser,
};
