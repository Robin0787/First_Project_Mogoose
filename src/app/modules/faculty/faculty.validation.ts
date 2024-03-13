import { z } from "zod";

const facultyNameSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "firstName must have minimum 3 characters" })
    .max(20, { message: "firstName can't have more than 20 characters" })
    .refine((value) => /^[A-Z]/.test(value), {
      message: "firstName must start with a capital letter.",
    }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(3, { message: "lastName must have minimum 3 characters" })
    .max(20, { message: "lastName can't have more than 20 characters" }),
});

const facultyCreateValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
      name: facultyNameSchema,
      designation: z.string(),
      email: z.string().email(),
      gender: z.enum(["Male", "Female"]),
      dateOfBirth: z.string().optional(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      academicDepartment: z.string(),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImage: z.string().optional(),
      isDeleted: z.boolean().default(false).optional(),
    }),
  }),
});

export const facultyValidations = {
  facultyCreateValidationSchema,
};
