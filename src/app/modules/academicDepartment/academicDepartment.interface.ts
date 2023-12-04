import { Model, Types } from "mongoose";

export interface TAcademicDepartment {
  name: string;
  academicFaculty: Types.ObjectId;
}

export interface AcademicDepartmentModel extends Model<TAcademicDepartment> {
  isDepartmentExists(id: string): Promise<TAcademicDepartment | null>;
}
