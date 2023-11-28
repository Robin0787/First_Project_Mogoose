import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const { student: studentData, password } = req.body;

    // const zodParsedUserData = userValidation.userValidationSchema.parse(password);

    // data validation with Zod library
    // const zodParsedData = studentValidationSchemaWithZod.parse(studentData);

    const result = await userServices.createStudentToDB(password, studentData);

    console.log(result);

    res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      error: {
        code: 500,
        description: error || "Something went wrong!",
      },
    });
  }
};

export const userControllers = {
  createUser,
};
