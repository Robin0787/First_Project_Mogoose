import { z } from "zod";
import {
  AcademicSemesterCodes,
  AcademicSemesterMonths,
  AcademicSemesterNames,
} from "./academicSemester.constant";

const academicSemesterCreateValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterNames] as [string, ...string[]]),
    code: z.enum([...AcademicSemesterCodes] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]]),
    endMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]]),
  }),
});

const academicSemesterUpdateValidationSchema = z.object({
  body: z.object({
    name: z
      .enum([...AcademicSemesterNames] as [string, ...string[]])
      .optional(),
    code: z
      .enum([...AcademicSemesterCodes] as [string, ...string[]])
      .optional(),
    year: z.string().optional(),
    startMonth: z
      .enum([...AcademicSemesterMonths] as [string, ...string[]])
      .optional(),
    endMonth: z
      .enum([...AcademicSemesterMonths] as [string, ...string[]])
      .optional(),
  }),
});

export const AcademicSemesterValidation = {
  academicSemesterCreateValidationSchema,
  academicSemesterUpdateValidationSchema,
};
