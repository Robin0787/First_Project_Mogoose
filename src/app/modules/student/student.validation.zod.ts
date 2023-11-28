import { z } from "zod";

const studentNameSchemaWithZod = z.object({
  firstName: z
    .string()
    .min(3, { message: "firstName must have minimum 3 characters" })
    .max(20, { message: "firstName can't have more than 20 characters" }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(3, { message: "lastName must have minimum 3 characters" })
    .max(20, { message: "lastName can't have more than 20 characters" }),
});

const guardianSchemaWithZod = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianSchemaWithZod = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const studentValidationSchemaWithZod = z.object({
  id: z.string(),
  name: studentNameSchemaWithZod,
  email: z.string().email(),
  password: z.string(),
  gender: z.enum(["Male", "Female"]),
  dateOfBirth: z.string(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: guardianSchemaWithZod,
  localGuardian: localGuardianSchemaWithZod,
  profileImage: z.string().optional(),
  isActive: z.enum(["Active", "Blocked"]).default("Active"),
  isDeleted: z.boolean().optional(),
});

export default studentValidationSchemaWithZod;
