import { Admin } from "./admin.model";

const getAllAdminsFromDB = async () => {
  const result = await Admin.find();
  return result;
};

export const adminServices = {
  getAllAdminsFromDB,
};
