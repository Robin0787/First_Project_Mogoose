import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { academicFacultyControllers } from "./academicFaculty.controller";
import { academicFacultyValidation } from "./academicFaculty.validation";

const router = Router();

router.post(
  "/create-academic-faculty",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(academicFacultyValidation.academicFacultyCreateValidation),
  academicFacultyControllers.createAcademicFaculty,
);

router.get("/", auth(), academicFacultyControllers.getAllAcademicFaculties);
router.get(
  "/:facultyId",
  auth(),
  academicFacultyControllers.getSingleAcademicFaculty,
);
router.patch(
  "/update-faculty/:facultyId",
  auth(),
  validateRequest(academicFacultyValidation.academicFacultyUpdateValidation),
  academicFacultyControllers.updateFaculty,
);

export const academicFacultyRoutes = router;
