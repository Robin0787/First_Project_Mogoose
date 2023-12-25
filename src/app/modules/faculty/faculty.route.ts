import { Router } from "express";
import auth from "../../middlewares/auth";
import { facultyControllers } from "./faculty.controller";

const router = Router();

router.get("", auth(), facultyControllers.getAllFaculties);
router.get("/:facultyId", auth(), facultyControllers.getSingleFaculty);

export const facultyRoutes = router;
