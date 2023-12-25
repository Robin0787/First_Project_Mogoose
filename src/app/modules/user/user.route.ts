import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidations } from "../admin/admin.validation";
import { facultyValidations } from "../faculty/faculty.validation";
import { studentValidations } from "../student/student.validation";
import { USER_ROLE } from "./user.constant";
import { userControllers } from "./user.controller";

const router = express.Router();

router.post(
  "/create-student",
  auth(USER_ROLE.admin),
  validateRequest(studentValidations.studentCreateValidationSchema),
  userControllers.createUser,
);

router.post(
  "/create-faculty",
  validateRequest(facultyValidations.facultyCreateValidationSchema),
  userControllers.createFaculty,
);
router.post(
  "/create-admin",
  validateRequest(adminValidations.adminCreateValidationSchema),
  userControllers.createAdmin,
);

export const userRoutes = router;
