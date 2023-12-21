import { z } from "zod";

const semesterRegistrationCreateValidationSchema = z.object({
  body: z.object({}),
});

const semesterRegistrationUpdateValidationSchema = z.object({
  body: z.object({}),
});

export const semesterRegistrationValidationSchemas = {
  semesterRegistrationCreateValidationSchema,
  semesterRegistrationUpdateValidationSchema,
};
