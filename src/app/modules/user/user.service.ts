import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentToDB = async (password: string, studentData: TStudent) => {
  // create user object
  const userData: Partial<TUser> = {
    id: "2030100001",
    password: password || (config.default_pass as string),
    role: "student",
  };
  // creating a user
  const createdUser = await User.create(userData);

  if (Object.keys(createdUser).length) {
    studentData.id = createdUser.id;
    studentData.user = createdUser._id;
    const result = await Student.create(studentData);
    return result;
  }
};

export const userServices = {
  createStudentToDB,
};
