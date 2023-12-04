import httpStatus from "http-status";
import { Schema, model } from "mongoose";
import { AppError } from "../../errors/AppError";
import {
  AcademicDepartmentModel,
  TAcademicDepartment,
} from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<
  TAcademicDepartment,
  AcademicDepartmentModel
>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "academicFaculty",
  },
});

academicDepartmentSchema.pre("save", async function (next) {
  const name = this.name;
  const isDepartmentExists = await AcademicDepartment.findOne({ name });
  if (isDepartmentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This department is already exists",
    );
  }
  next();
});

academicDepartmentSchema.statics.isDepartmentExists = async (id: string) => {
  const result = await AcademicDepartment.findById(id);
  return result;
};

export const AcademicDepartment = model<
  TAcademicDepartment,
  AcademicDepartmentModel
>("academicDepartment", academicDepartmentSchema);
