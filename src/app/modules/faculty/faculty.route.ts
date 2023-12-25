import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { facultyControllers } from "./faculty.controller";

const router = Router();

router.get(
  "",
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  facultyControllers.getAllFaculties,
);
router.get("/:facultyId", auth(), facultyControllers.getSingleFaculty);

export const facultyRoutes = router;
