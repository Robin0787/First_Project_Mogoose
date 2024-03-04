import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { adminControllers } from "./admin.controller";

const router = Router();

router.get(
  "",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  adminControllers.getAllAdmins,
);
router.get(
  "/:adminId",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  adminControllers.getSingleAdmin,
);

export const adminRoutes = router;
