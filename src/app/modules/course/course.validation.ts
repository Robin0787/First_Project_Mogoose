import { z } from "zod";

const courseCreateValidationSchema = z.object({
  body: z.object({
    course: z.object({
      title: z.string(),
      prefix: z.string(),
      code: z.number(),
      credits: z.number(),
      preRequisiteCourses: z
        .object({
          course: z.string(),
          isDeleted: z.boolean().optional(),
        })
        .array()
        .optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

// const courseUpdateValidationSchema = z.object({
//   body: z.object({
//     course: z.object({
//       title: z.string().optional(),
//       prefix: z.string().optional(),
//       code: z.number().optional(),
//       credits: z.number().optional(),
//       preRequisiteCourses: z
//         .object({
//           course: z.string().optional(),
//           isDeleted: z.boolean().optional(),
//         })
//         .array()
//         .optional(),
//     }),
//   }),
// });

const courseUpdateValidationSchema = courseCreateValidationSchema.partial();

export const courseValidationSchemas = {
  courseCreateValidationSchema,
  courseUpdateValidationSchema,
};
