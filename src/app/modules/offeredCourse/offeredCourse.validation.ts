import { z } from "zod";
import { Days } from "./offeredCourse.constant";

const startTimeStringSchema = z.string().refine(
  (time) => {
    const regex: RegExp = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  {
    message: 'Invalid startTime format, expected "HH:MM" in 24 hours format.',
  },
);

const endTimeStringSchema = z.string().refine(
  (time) => {
    const regex: RegExp = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  {
    message: 'Invalid endTime format, expected "HH:MM" in 24 hours format.',
  },
);

const offeredCourseCreateValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: startTimeStringSchema,
      endTime: endTimeStringSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}`);
        const end = new Date(`1970-01-01T${body.endTime}`);
        return end > start;
      },
      {
        message: "The endTime can't be earlier than the startTime",
      },
    ),
});

const offeredCourseUpdateValidationSchema = z.object({
  body: z.object({
    faculty: z.string(),
    maxCapacity: z.number(),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: startTimeStringSchema,
    endTime: endTimeStringSchema,
  }),
});

export const offeredCourseValidationSchemas = {
  offeredCourseCreateValidationSchema,
  offeredCourseUpdateValidationSchema,
};
