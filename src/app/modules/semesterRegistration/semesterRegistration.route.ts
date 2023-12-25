import { Router } from "express";

import validateRequest from "../../middlewares/validateRequest";
import { semesterRegistrationControllers } from "./semesterRegistration.controller";
import { semesterRegistrationValidationSchemas } from "./semesterRegistration.validation";

const router = Router();

router.post(
  "/create-semester-registration",
  validateRequest(
    semesterRegistrationValidationSchemas.semesterRegistrationCreateValidationSchema,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);

router.get("/", semesterRegistrationControllers.getAllSemesterRegistration);
router.get(
  "/:id",
  semesterRegistrationControllers.getSingleSemesterRegistration,
);
router.patch(
  "/:id",
  validateRequest(
    semesterRegistrationValidationSchemas.semesterRegistrationUpdateValidationSchema,
  ),
  semesterRegistrationControllers.updateSemesterRegistration,
);

router.delete(
  "/:id",
  semesterRegistrationControllers.deleteSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
