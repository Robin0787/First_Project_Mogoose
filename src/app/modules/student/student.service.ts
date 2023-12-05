import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { Student } from "./student.model";

const getAllStudents = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const getSingleStudent = async (studentId: string) => {
  if (!(await Student.isStudentExists(studentId))) {
    throw new AppError(httpStatus.NOT_FOUND, "Student doesn't exist!!");
  }
  const result = await Student.findOne({ id: studentId })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const deleteSingleStudentFromDB = async (studentId: string) => {
  if (!(await Student.isStudentExists(studentId))) {
    throw new AppError(httpStatus.NOT_FOUND, "Student doesn't exist!!");
  }
  const result = await Student.updateOne(
    { id: studentId },
    { $set: { isDeleted: true } },
  );
  return result;
};

export const studentServices = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudentFromDB,
};
