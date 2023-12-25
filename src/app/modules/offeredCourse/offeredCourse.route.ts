import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { offeredCourseControllers } from "./offeredCourse.controller";
import { offeredCourseValidationSchemas } from "./offeredCourse.validation";

const router = Router();

router.get("/", offeredCourseControllers.getAllOfferedCourse);

router.get("/:id", offeredCourseControllers.getSingleOfferedCourse);

router.post(
  "/create-offered-course",
  validateRequest(
    offeredCourseValidationSchemas.offeredCourseCreateValidationSchema,
  ),
  offeredCourseControllers.createOfferedCourse,
);

router.patch(
  "/:id",
  validateRequest(
    offeredCourseValidationSchemas.offeredCourseUpdateValidationSchema,
  ),
  offeredCourseControllers.updateOfferedCourse,
);

router.delete("/:id", offeredCourseControllers.deleteOfferedCourse);

export const offeredCourseRoutes = router;
