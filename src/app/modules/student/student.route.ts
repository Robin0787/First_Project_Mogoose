import express from "express";
import { studentControllers } from "./student.controller";

const router = express.Router();

// It will call the controller function
router.post("/create-student", studentControllers.createStudent);
router.get("/", studentControllers.getAllStudents);
router.get("/:studentId", studentControllers.getSingleStudent);
router.delete("/:studentId", studentControllers.deleteSingleStudent);

export const studentRoutes = router;
