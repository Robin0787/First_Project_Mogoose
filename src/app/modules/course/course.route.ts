import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { courseControllers } from "./course.controller";
import { courseValidationSchemas } from "./course.validation";

const router = Router();

router.post(
  "",
  validateRequest(courseValidationSchemas.courseCreateValidationSchema),
  courseControllers.createCourse,
);
router.patch(
  "/:id",
  validateRequest(courseValidationSchemas.courseUpdateValidationSchema),
  courseControllers.updatedSingleCourse,
);
router.get("", courseControllers.getAllCourses);
router.get("/:id", courseControllers.getSingleCourse);
router.delete("/:id", courseControllers.deleteSingleCourse);

export const courseRoutes = router;
