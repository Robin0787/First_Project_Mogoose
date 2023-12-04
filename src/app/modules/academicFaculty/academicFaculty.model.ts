import { Schema, model } from "mongoose";
import {
  AcademicFacultyModel,
  TAcademicFaculty,
} from "./academicFaculty.interface";

const academicFacultySchema = new Schema<
  TAcademicFaculty,
  AcademicFacultyModel
>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

academicFacultySchema.statics.isAcademicFacultyExists = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

export const AcademicFaculty = model<TAcademicFaculty, AcademicFacultyModel>(
  "academicFaculty",
  academicFacultySchema,
);
