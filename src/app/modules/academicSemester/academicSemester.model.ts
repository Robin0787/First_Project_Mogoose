import httpStatus from "http-status";
import { Schema, model } from "mongoose";
import { AppError } from "../../errors/AppError";
import {
  AcademicSemesterCodes,
  AcademicSemesterMonths,
  AcademicSemesterNames,
} from "./academicSemester.constant";
import {
  AcademicSemesterModel,
  TAcademicSemester,
} from "./academicSemester.interface";

const AcademicSemesterSchema = new Schema<
  TAcademicSemester,
  AcademicSemesterModel
>(
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
    throw new AppError(httpStatus.NOT_FOUND, "Semester is already exists!!");
  }
  next();
});

AcademicSemesterSchema.statics.isAcademicSemesterExists = async (
  id: string,
) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

export const AcademicSemester = model<TAcademicSemester, AcademicSemesterModel>(
  "academicSemester",
  AcademicSemesterSchema,
);
