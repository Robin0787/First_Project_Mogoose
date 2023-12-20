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
router.put(
  "/:courseId/assign-faculties",
  validateRequest(
    courseValidationSchemas.courseFacultiesAssignValidationSchema,
  ),
  courseControllers.assignFacultiesToCourse,
);
router.put(
  "/:courseId/remove-faculties",
  validateRequest(
    courseValidationSchemas.courseFacultiesAssignValidationSchema,
  ),
  courseControllers.removeFacultiesFromCourse,
);

export const courseRoutes = router;
