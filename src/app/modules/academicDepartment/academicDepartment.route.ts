import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicDepartmentControllers } from "./academicDepartment.controller";
import { academicDepartmentValidations } from "./academicDepartment.validation";

const router = Router();

router.post(
  "/create-academic-department",
  // validateRequest(
  //   academicDepartmentValidations.academicDepartmentCreateValidationSchema,
  // ),
  academicDepartmentControllers.createAcademicDepartment,
);

router.get("/", academicDepartmentControllers.getAllAcademicDepartment);
router.get(
  "/:departmentId",
  academicDepartmentControllers.getSingleAcademicDepartment,
);
router.patch(
  "/update-academic-department/:departmentId",
  validateRequest(
    academicDepartmentValidations.academicDepartmentUpdateValidationSchema,
  ),
  academicDepartmentControllers.updateAcademicDepartment,
);

export const academicDepartmentRoutes = router;
