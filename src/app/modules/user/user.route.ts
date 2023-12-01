import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { studentValidations } from "../student/student.validation";
import { userControllers } from "./user.controller";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(studentValidations.studentCreateValidationSchema),
  userControllers.createUser,
);

export const userRoutes = router;
