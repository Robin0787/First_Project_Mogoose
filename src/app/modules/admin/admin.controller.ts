import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { adminServices } from "./admin.service";

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await adminServices.getAllAdminsFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Admins are retrieved successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const result = await adminServices.getSingleAdminFromDB(adminId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Admin is retrieved successfully",
    data: result,
  });
});

export const adminControllers = {
  getAllAdmins,
  getSingleAdmin,
};
