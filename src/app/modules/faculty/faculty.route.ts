import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { facultyControllers } from "./faculty.controller";

const router = Router();

router.get(
  "",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  facultyControllers.getAllFaculties,
);
router.get(
  "/:facultyId",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  facultyControllers.getSingleFaculty,
);

export const facultyRoutes = router;
