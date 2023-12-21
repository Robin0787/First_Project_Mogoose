import { z } from "zod";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";

const semesterRegistrationCreateValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum([...SemesterRegistrationStatus] as [string, ...string[]]),
    startDate: z.string(),
    endDate: z.string(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});

const semesterRegistrationUpdateValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string().optional(),
    status: z
      .enum([...SemesterRegistrationStatus] as [string, ...string[]])
      .optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});

export const semesterRegistrationValidationSchemas = {
  semesterRegistrationCreateValidationSchema,
  semesterRegistrationUpdateValidationSchema,
};
