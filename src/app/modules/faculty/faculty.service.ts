import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { AppError } from "../../errors/AppError";
import { Faculty } from "./faculty.model";

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const defaultQuery = Faculty.find()
    .populate("academicDepartment")
    .populate("academicFaculty")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  const facultiesQuery = new QueryBuilder(defaultQuery, query)
    .filter()
    .sort()
    .paginate()
    .filterFields();
  const result = await facultiesQuery.modelQuery;
  const countTotal = await facultiesQuery.countTotal();
  return { meta: countTotal, data: result };
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Faculty doesn't exist");
  }
  return result;
};

export const facultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
};
