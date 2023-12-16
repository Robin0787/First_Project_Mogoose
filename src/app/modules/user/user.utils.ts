import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const getLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: "student" }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester | null) => {
  let currentId = (0).toString();

  const lastStudentId = await getLastStudentId();
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4);
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const currentSemesterYear = payload?.year;
  const currentSemesterCode = payload?.code;

  if (
    lastStudentId &&
    lastStudentSemesterYear === currentSemesterYear &&
    lastStudentSemesterCode === currentSemesterCode
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementedId: string = (Number(currentId) + 1)
    .toString()
    .padStart(4, "0");
  incrementedId = `${payload?.year}${payload?.code}${incrementedId}`;
  return incrementedId;
};

const getLastFacultyId = async () => {
  const lastFaculty = await User.findOne({ role: "faculty" }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastFaculty?.id ? lastFaculty.id : undefined;
};

export const generateFacultyId = async () => {
  let currentFacultyId = (0).toString();

  const lastFacultyId = await getLastFacultyId();

  if (lastFacultyId) {
    const lastFacultyIdOnlyDigit = Number(lastFacultyId?.substring(2));
    currentFacultyId = lastFacultyIdOnlyDigit.toString();
  }

  const incrementedFacultyId = (Number(currentFacultyId) + 1)
    .toString()
    .padStart(4, "0");

  return `F-${incrementedFacultyId}`;
};

const getLastAdminId = async () => {
  const lastAdmin = await User.findOne({ role: "admin" }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastAdmin?.id ? lastAdmin.id : undefined;
};

export const generateAdminId = async () => {
  let currentAdminId = (0).toString();

  const lastAdminId = await getLastAdminId();

  if (lastAdminId) {
    const lastAdminIdOnlyDigit = Number(lastAdminId?.substring(2));
    currentAdminId = lastAdminIdOnlyDigit.toString();
  }

  const incrementedAdminId = (Number(currentAdminId) + 1)
    .toString()
    .padStart(4, "0");

  return `A-${incrementedAdminId}`;
};
