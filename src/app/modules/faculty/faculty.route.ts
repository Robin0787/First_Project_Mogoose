import { Router } from "express";
import { facultyControllers } from "./faculty.controller";

const router = Router();

router.get("", facultyControllers.getAllFaculties);

export const facultyRoutes = router;
