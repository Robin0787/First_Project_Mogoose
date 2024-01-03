import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { studentControllers } from "./student.controller";
import { studentValidations } from "./student.validation";

const router = express.Router();

router.get("/", studentControllers.getAllStudents);
router.get(
  "/:id",
  auth(USER_ROLE.faculty, USER_ROLE.admin),
  studentControllers.getSingleStudent,
);

router.patch(
  "/:id",
  validateRequest(studentValidations.studentUpdateValidationSchema),
  studentControllers.updatedStudent,
);

router.delete("/:id", studentControllers.deleteSingleStudent);

export const studentRoutes = router;
