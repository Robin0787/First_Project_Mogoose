import { Router } from "express";

import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { semesterRegistrationControllers } from "./semesterRegistration.controller";
import { semesterRegistrationValidationSchemas } from "./semesterRegistration.validation";

const router = Router();

router.post(
  "/create-semester-registration",
  auth(),
  validateRequest(
    semesterRegistrationValidationSchemas.semesterRegistrationCreateValidationSchema,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);

router.get(
  "/",
  auth(),
  semesterRegistrationControllers.getAllSemesterRegistration,
);
router.get(
  "/:id",
  auth(),
  semesterRegistrationControllers.getSingleSemesterRegistration,
);
router.patch(
  "/:id",
  auth(),
  validateRequest(
    semesterRegistrationValidationSchemas.semesterRegistrationUpdateValidationSchema,
  ),
  semesterRegistrationControllers.updateSemesterRegistration,
);

router.delete(
  "/:id",
  auth(),
  semesterRegistrationControllers.deleteSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
