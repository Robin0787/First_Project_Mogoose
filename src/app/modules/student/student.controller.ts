import { Request, Response } from "express";
import { studentServices } from "./student.service";
import studentValidationSchemaWithZod from "./student.validation.zod";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // data validation with Zod library
    const zodParsedData = studentValidationSchemaWithZod.parse(studentData);

    // data validation with Joi library
    // const { error, value } = studentValidationSchema.validate(studentData);
    // if (error) {
    //   return res.status(500).json({
    //     success: false,
    //     message: error.message,
    //     error: error.details,
    //   });
    // }

    // will cal service function to save data to DB
    const result = await studentServices.createStudentToDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudents();
    res.status(200).json({
      success: true,
      message: "Students are retrieve successfully.",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudent(studentId);
    res.status(200).json({
      success: true,
      message: "Student is retrieve successfully.",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};

export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
