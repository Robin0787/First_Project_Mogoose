import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicFacultyControllers } from "./academicFaculty.controller";
import { academicFacultyValidation } from "./academicFaculty.validation";

const router = Router();

router.post(
  "/create-academic-faculty",
  validateRequest(academicFacultyValidation.academicFacultyCreateValidation),
  academicFacultyControllers.createAcademicFaculty,
);

router.get("/", academicFacultyControllers.getAllAcademicFaculties);
router.get("/:facultyId", academicFacultyControllers.getSingleAcademicFaculty);
router.patch(
  "/update-faculty/:facultyId",
  validateRequest(academicFacultyValidation.academicFacultyUpdateValidation),
  academicFacultyControllers.updateFaculty,
);

export const academicFacultyRoutes = router;
