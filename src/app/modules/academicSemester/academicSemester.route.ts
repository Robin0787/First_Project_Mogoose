import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import { AcademicSemesterValidation } from "./academicSemester.validation";

const router = Router();

router.post(
  "/create-academic-semester",
  auth(),
  validateRequest(
    AcademicSemesterValidation.academicSemesterCreateValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);
router.get(
  "/get-all-semester",
  auth(),
  AcademicSemesterControllers.getAllSemester,
);
router.get(
  "/:semesterId",
  auth(),
  AcademicSemesterControllers.getSingleSemester,
);
router.patch(
  "/update-semester/:semesterId",
  auth(),
  validateRequest(
    AcademicSemesterValidation.academicSemesterUpdateValidationSchema,
  ),
  AcademicSemesterControllers.updateSingleSemester,
);

export const AcademicSemesterRoutes = router;
