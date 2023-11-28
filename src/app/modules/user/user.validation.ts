import { z } from "zod";

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: "password must be string",
    })
    .min(8, { message: "password must contain minimum of 8 characters." })
    .max(16, { message: "password must be within 17 characters" })
    .optional(),
});

export const userValidation = {
  userValidationSchema,
};
