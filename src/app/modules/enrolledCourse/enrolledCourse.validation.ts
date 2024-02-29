import { z } from "zod";

const enrolledCourseCreateValidationSchema = z.object({
  body: z.object({
    offeredCourse: z.string(),
  }),
});

export const enrolledCourseValidationSchemas = {
  enrolledCourseCreateValidationSchema,
};
