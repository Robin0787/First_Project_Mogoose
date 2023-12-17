import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { Admin } from "./admin.model";

const getAllAdminsFromDB = async () => {
  const result = await Admin.find();
  return result;
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
