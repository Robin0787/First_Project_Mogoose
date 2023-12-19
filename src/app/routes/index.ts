import { Router } from "express";
import { academicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { adminRoutes } from "../modules/admin/admin.route";
import { courseRoutes } from "../modules/course/course.route";
import { facultyRoutes } from "../modules/faculty/faculty.route";
import { studentRoutes } from "../modules/student/student.route";
import { userRoutes } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    routes: userRoutes,
  },
  {
    path: "/students",
    routes: studentRoutes,
  },
  {
    path: "/academic-semesters",
    routes: AcademicSemesterRoutes,
  },
  {
    path: "/academic-faculties",
    routes: academicFacultyRoutes,
  },
  {
    path: "/academic-departments",
    routes: academicDepartmentRoutes,
  },
  {
    path: "/faculties",
    routes: facultyRoutes,
  },
  {
    path: "/admins",
    routes: adminRoutes,
  },
  {
    path: "/courses",
    routes: courseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;
