import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { offeredCourseControllers } from "./offeredCourse.controller";
import { offeredCourseValidationSchemas } from "./offeredCourse.validation";

const router = Router();

router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  offeredCourseControllers.getAllOfferedCourse,
);

router.get(
  "/my-offered-courses",
  auth(USER_ROLE.student),
  offeredCourseControllers.getMyOfferedCourses,
);

router.get("/:id", auth(), offeredCourseControllers.getSingleOfferedCourse);

router.post(
  "/create-offered-course",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    offeredCourseValidationSchemas.offeredCourseCreateValidationSchema,
  ),
  offeredCourseControllers.createOfferedCourse,
);

router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    offeredCourseValidationSchemas.offeredCourseUpdateValidationSchema,
  ),
  offeredCourseControllers.updateOfferedCourse,
);

router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  offeredCourseControllers.deleteOfferedCourse,
);

export const offeredCourseRoutes = router;
