import { z } from "zod";
import { Days } from "./offeredCourse.constant";

const offeredCourseCreateValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number(),
    section: z.number(),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: z.string(),
    endTime: z.string(),
  }),
});

const offeredCourseUpdateValidationSchema = z.object({
  body: z.object({
    faculty: z.string().optional(),
    maxCapacity: z.number().optional(),
    days: z.enum([...Days] as [string, ...string[]]).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});

export const offeredCourseValidationSchemas = {
  offeredCourseCreateValidationSchema,
  offeredCourseUpdateValidationSchema,
};
