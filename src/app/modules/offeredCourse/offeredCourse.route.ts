import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { offeredCourseControllers } from "./offeredCourse.controller";
import { offeredCourseValidationSchemas } from "./offeredCourse.validation";

const router = Router();

router.get("/", auth(), offeredCourseControllers.getAllOfferedCourse);

router.get("/:id", auth(), offeredCourseControllers.getSingleOfferedCourse);

router.post(
  "/create-offered-course",
  auth(),
  validateRequest(
    offeredCourseValidationSchemas.offeredCourseCreateValidationSchema,
  ),
  offeredCourseControllers.createOfferedCourse,
);

router.patch(
  "/:id",
  auth(),
  validateRequest(
    offeredCourseValidationSchemas.offeredCourseUpdateValidationSchema,
  ),
  offeredCourseControllers.updateOfferedCourse,
);

router.delete("/:id", auth(), offeredCourseControllers.deleteOfferedCourse);

export const offeredCourseRoutes = router;
