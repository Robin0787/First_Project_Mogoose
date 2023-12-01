import {
  TAcademicSemesterCodes,
  TAcademicSemesterMonths,
  TAcademicSemesterNames,
} from "./academicSemester.interface";
import { TAcademicSemesterNameCodeMapper } from "./academicSemester.service";

export const AcademicSemesterMonths: TAcademicSemesterMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const AcademicSemesterNames: TAcademicSemesterNames[] = [
  "Autumn",
  "Summer",
  "Fall",
];

export const AcademicSemesterCodes: TAcademicSemesterCodes[] = [
  "01",
  "02",
  "03",
];

export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};
