import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidations } from "../admin/admin.validation";
import { facultyValidations } from "../faculty/faculty.validation";
import { studentValidations } from "../student/student.validation";
import { USER_ROLE } from "./user.constant";
import { userControllers } from "./user.controller";
import { userValidations } from "./user.validation";

const router = express.Router();

router.post(
  "/create-student",
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(studentValidations.studentCreateValidationSchema),
  userControllers.createUser,
);
router.post(
  "/create-faculty",
  auth(USER_ROLE.admin),
  validateRequest(facultyValidations.facultyCreateValidationSchema),
  userControllers.createFaculty,
);
router.post(
  "/create-admin",
  validateRequest(adminValidations.adminCreateValidationSchema),
  userControllers.createAdmin,
);
router.get(
  "/me",
  auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
  userControllers.getMe,
);
router.post(
  "/change-status/:id",
  auth(USER_ROLE.admin),
  validateRequest(userValidations.userStatusChangeValidationSchema),
  userControllers.changeUserStatus,
);

export const userRoutes = router;
