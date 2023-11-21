import { StudentModel } from "../student.model";
import { Student } from "./student.interface";

const createStudentToDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudents = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudent = async (studentId: string) => {
  const result = await StudentModel.findOne({ id: studentId });
  return result;
};

export const studentServices = {
  createStudentToDB,
  getAllStudents,
  getSingleStudent,
};
