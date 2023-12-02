import { TAcademicSemester } from "../academicSemester/academicSemester.interface";

export const generateStudentId = (
  payload: TAcademicSemester | null,
): string => {
  const currentId = (0).toString();
  let incrementedId: string = (Number(currentId) + 1)
    .toString()
    .padStart(4, "0");
  incrementedId = `${payload?.year}${payload?.code}${incrementedId}`;
  return incrementedId;
};
