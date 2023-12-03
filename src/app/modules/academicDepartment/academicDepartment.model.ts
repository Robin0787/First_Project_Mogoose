import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
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
    throw new Error("This department is already exists");
  }
  next();
});
academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isDepartmentExists = await AcademicDepartment.findOne(query);
  if (!isDepartmentExists) {
    throw new Error("This department doesn't exist");
  }
  next();
});
academicDepartmentSchema.pre("findOne", async function (next) {
  const query = this.getQuery();
  const isDepartmentExists = await AcademicDepartment.findOne(query);
  if (!isDepartmentExists) {
    throw new Error("This department doesn't exist");
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  "academicDepartment",
  academicDepartmentSchema,
);
