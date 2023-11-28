import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentToDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student);
  const student = new Student(studentData);
  if (await student.isUserExists(studentData.id)) {
    throw new Error("User already exists");
  }
  const result = await student.save();
  return result;
};

const getAllStudents = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudent = async (studentId: string) => {
  // const result = await Student.findOne({ id: studentId });
  // return result;
  const result = await Student.aggregate([{ $match: { id: studentId } }]);
  return result;
};

const deleteSingleStudentFromDB = async (studentId: string) => {
  const result = await Student.updateOne(
    { id: studentId },
    { $set: { isDeleted: true } },
  );
  return result;
};

export const studentServices = {
  createStudentToDB,
  getAllStudents,
  getSingleStudent,
  deleteSingleStudentFromDB,
};
