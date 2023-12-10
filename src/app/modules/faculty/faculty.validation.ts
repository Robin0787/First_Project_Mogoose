import { z } from "zod";

const facultyCreateValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
      id: z.string(),
      name: z.string(),
      designation: z.string(),
      email: z.string().email(),
      gender: z.enum(["Male", "Female"]),
      dateOfBirth: z.string().optional(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      academicDepartment: z.string(),
      academicFaculty: z.string(),
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
