import express from "express";
import { getcourses, getUserCourses, createcourse, readcourses, updatecourse, deletecourse } from "../controllers/courses.js";
import { viewcourses, getEnrolledCourses } from "../controllers/viewcourses.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/courses", getcourses);
router.post("/courses", authenticateToken, createcourse);
router.get("/courses/user", authenticateToken, getUserCourses);
router.put("/courses/:id", authenticateToken, updatecourse);
router.get("/courses/:id", readcourses);
router.delete("/courses/:courseId", authenticateToken, deletecourse);

router.post("/viewcourses", authenticateToken, viewcourses);
router.get("/enrolled-courses", authenticateToken, getEnrolledCourses);
router.get("/viewcourses", authenticateToken, getEnrolledCourses);


export default router;
