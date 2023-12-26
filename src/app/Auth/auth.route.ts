import { Router } from "express";
import auth from "../middlewares/auth";
import validateRequest from "../middlewares/validateRequest";
import { USER_ROLE } from "../modules/user/user.constant";
import { AuthControllers } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.patch(
  "/change-password",
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

export const AuthRoutes = router;