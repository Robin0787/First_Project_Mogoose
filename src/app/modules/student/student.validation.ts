import { z } from "zod";

const studentNameSchema = z.object({
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

const guardianSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const studentCreateValidationSchema = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: "password must be string",
      })
      .min(8, { message: "password must contain minimum of 8 characters." })
      .max(16, { message: "password can contain 16 characters at max." })
      .optional(),
    student: z.object({
      id: z.string(),
      name: studentNameSchema,
      email: z.string().email(),
      gender: z.enum(["Male", "Female"]),
      dateOfBirth: z.string().optional(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      academicDepartment: z.string(),
      admissionSemester: z.string(),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,
      // profileImage: z.string().optional(),
    }),
  }),
});

const studentNameSchemaForUpdate = z.object({
  firstName: z
    .string()
    .min(3, { message: "firstName must have minimum 3 characters" })
    .max(20, { message: "firstName can't have more than 20 characters" })
    .refine((value) => /^[A-Z]/.test(value), {
      message: "firstName must start with a capital letter.",
    })
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(3, { message: "lastName must have minimum 3 characters" })
    .max(20, { message: "lastName can't have more than 20 characters" })
    .optional(),
});

const guardianSchemaForUpdate = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const localGuardianSchemaForUpdate = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

const studentUpdateValidationSchema = z.object({
  body: z.object({
    student: z.object({
      id: z.string().optional(),
      name: studentNameSchemaForUpdate.optional(),
      email: z.string().email().optional(),
      gender: z.enum(["Male", "Female"]).optional(),
      dateOfBirth: z.string().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      academicDepartment: z.string().optional(),
      admissionSemester: z.string().optional(),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: guardianSchemaForUpdate.optional(),
      localGuardian: localGuardianSchemaForUpdate.optional(),
      profileImage: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  studentCreateValidationSchema,
  studentUpdateValidationSchema,
};
