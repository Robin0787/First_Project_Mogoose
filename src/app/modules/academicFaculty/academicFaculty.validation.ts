import { z } from "zod";

const academicFacultyCreateValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Name must be a string",
    }),
  }),
});

const academicFacultyUpdateValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Name must be a string",
    }),
  }),
});

export const academicFacultyValidation = {
  academicFacultyCreateValidation,
  academicFacultyUpdateValidation,
};
