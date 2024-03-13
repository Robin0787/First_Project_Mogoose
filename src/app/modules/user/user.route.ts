import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { upload } from "../../utils/sendImageToCloudinary";
import { adminValidations } from "../admin/admin.validation";
import { facultyValidations } from "../faculty/faculty.validation";
import { studentValidations } from "../student/student.validation";
import { USER_ROLE } from "./user.constant";
import { userControllers } from "./user.controller";
import { userValidations } from "./user.validation";

const router = express.Router();

router.post(
  "/create-student",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(studentValidations.studentCreateValidationSchema),
  userControllers.createStudent,
);
router.post(
  "/create-faculty",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(facultyValidations.facultyCreateValidationSchema),
  userControllers.createFaculty,
);
router.post(
  "/create-admin",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
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
