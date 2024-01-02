import { z } from "zod";
import { USER_STATUS } from "./user.constant";

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: "password must be string",
    })
    .min(8, { message: "password must contain minimum of 8 characters." })
    .max(16, { message: "password must be within 17 characters" })
    .optional(),
});

const userStatusChangeValidationSchema = z.object({
  body: z.object({
    status: z.enum([...USER_STATUS] as [string, ...string[]]),
  }),
});

export const userValidations = {
  userValidationSchema,
  userStatusChangeValidationSchema,
};
