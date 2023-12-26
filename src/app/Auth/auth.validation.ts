import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: "Id is required." }),
    password: z.string({ required_error: "Password is required." }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    currentPassword: z.string({
      required_error: "currentPassword is required.",
    }),
    newPassword: z.string({ required_error: "newPassword is required." }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: "refreshToken is required!" }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
};
