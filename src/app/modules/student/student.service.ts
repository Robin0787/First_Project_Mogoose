import { Student } from "./student.model";

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
  getAllStudents,
  getSingleStudent,
  deleteSingleStudentFromDB,
};
