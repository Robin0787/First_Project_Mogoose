import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { facultyValidations } from "../faculty/faculty.validation";
import { studentValidations } from "../student/student.validation";
import { userControllers } from "./user.controller";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(studentValidations.studentCreateValidationSchema),
  userControllers.createUser,
);

router.post(
  "/create-faculty",
  validateRequest(facultyValidations.facultyCreateValidationSchema),
  userControllers.createFaculty,
);

export const userRoutes = router;
