import { Schema, model } from "mongoose";
import {
  AcademicSemesterCodes,
  AcademicSemesterMonths,
  AcademicSemesterNames,
} from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";

const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: { type: String, enum: AcademicSemesterNames, required: true },
    code: {
      type: String,
      enum: AcademicSemesterCodes,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: { type: String, enum: AcademicSemesterMonths, required: true },
    endMonth: { type: String, enum: AcademicSemesterMonths, required: true },
  },
  { timestamps: true },
);

// pre middlewares
AcademicSemesterSchema.pre("save", async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });

  if (isSemesterExists) {
    throw new Error("Semester is already exists!");
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  AcademicSemesterSchema,
);
