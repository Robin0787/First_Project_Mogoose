import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { courseControllers } from "./course.controller";
import { courseValidationSchemas } from "./course.validation";

const router = Router();

router.post(
  "",
  auth(USER_ROLE.admin),
  validateRequest(courseValidationSchemas.courseCreateValidationSchema),
  courseControllers.createCourse,
);
router.patch(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(courseValidationSchemas.courseUpdateValidationSchema),
  courseControllers.updatedSingleCourse,
);
router.get("", auth(), courseControllers.getAllCourses);
router.get("/:id", auth(), courseControllers.getSingleCourse);
router.delete(
  "/:id",
  auth(USER_ROLE.admin),
  courseControllers.deleteSingleCourse,
);
router.put(
  "/:courseId/assign-faculties",
  auth(USER_ROLE.admin),
  validateRequest(
    courseValidationSchemas.courseFacultiesAssignValidationSchema,
  ),
  courseControllers.assignFacultiesToCourse,
);
router.put(
  "/:courseId/remove-faculties",
  auth(USER_ROLE.admin),
  validateRequest(
    courseValidationSchemas.courseFacultiesAssignValidationSchema,
  ),
  courseControllers.removeFacultiesFromCourse,
);

export const courseRoutes = router;
