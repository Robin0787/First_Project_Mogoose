import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { AppError } from "../../errors/AppError";
import { Admin } from "./admin.model";

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const modelQueryForBuilder = Admin.find();
  const adminQuery = new QueryBuilder(modelQueryForBuilder, query)
    .filter()
    .sort()
    .paginate()
    .filterFields();
  const result = await adminQuery.modelQuery;
  const countTotal = await adminQuery.countTotal();
  return { meta: countTotal, data: result };
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Admin doesn't exist");
  }
  return result;
};

export const adminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
};
