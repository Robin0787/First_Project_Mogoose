import { Faculty } from "./faculty.model";

const getAllFacultiesFromDB = async () => {
  const result = await Faculty.find()
    .populate("academicDepartment")
    .populate("academicFaculty")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

export const facultyServices = {
  getAllFacultiesFromDB,
};
