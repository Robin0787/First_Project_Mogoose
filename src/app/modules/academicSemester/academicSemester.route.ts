import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import { AcademicSemesterValidation } from "./academicSemester.validation";

const router = Router();

router.post(
  "/create-academic-semester",
  validateRequest(
    AcademicSemesterValidation.academicSemesterCreateValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

router.get("/get-all-semester", AcademicSemesterControllers.getAllSemester);
router.get("/:semesterId", AcademicSemesterControllers.getSingleSemester);

export const AcademicSemesterRoutes = router;
