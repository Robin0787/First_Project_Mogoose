import { Router } from "express";

import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { semesterRegistrationControllers } from "./semesterRegistration.controller";
import { semesterRegistrationValidationSchemas } from "./semesterRegistration.validation";

const router = Router();

router.post(
  "/create-semester-registration",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
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
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    semesterRegistrationValidationSchemas.semesterRegistrationUpdateValidationSchema,
  ),
  semesterRegistrationControllers.updateSemesterRegistration,
);

router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  semesterRegistrationControllers.deleteSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
