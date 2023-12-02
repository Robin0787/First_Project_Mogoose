import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentToDB = async (password: string, payload: TStudent) => {
  // create user object
  const userData: Partial<TUser> = {
    id: "2030100001",
    password: password || (config.default_pass as string),
    role: "student",
  };

  // getting academic semester information
  const academicSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  // setting users id
  userData.id = generateStudentId(academicSemester);

  // creating a user
  const createdUser = await User.create(userData);

  if (Object.keys(createdUser).length) {
    payload.id = createdUser.id;
    payload.user = createdUser._id;
    const result = await Student.create(payload);
    return result;
  }
};

export const userServices = {
  createStudentToDB,
};
