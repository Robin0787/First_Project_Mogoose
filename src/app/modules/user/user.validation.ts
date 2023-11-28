import { z } from "zod";

const userValidationSchema = z.object({
  id: z.string(),
  password: z
    .string()
    .min(8, { message: "password must contain minimum of 8 characters." })
    .max(16, { message: "password must be within 17 characters" }),
  needsPasswordChange: z.boolean().optional().default(true),
  role: z.enum(["admin", "faculty", "student"]),
  status: z.enum(["in-progress", "blocked"]).default("in-progress"),
  isDeleted: z.boolean().default(false),
});

export const userValidation = {
  userValidationSchema,
};
