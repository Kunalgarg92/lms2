import Course from "../models/courses.js";
import mongoose from "mongoose";
import ViewCourse from '../models/viewcourses.js';
import { getCookie } from "../middleware/authMiddleware.js";
import jwt from 'jsonwebtoken';
export const getcourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const createcourse = async (req, res) => {
  try {
    const userId = req.user.id; 

    const courseData = { ...req.body, userId };
    const course = new Course(courseData);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const getUserCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Fetching courses for user ID:", userId);

    const courses = await Course.find({ userId: userId });

    if (!courses.length) {
      console.log("No courses found for user ID:", userId);
      return res.status(404).json({ message: "No courses found for this user." });
    }

    console.log("Courses found:", courses); 
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    res.status(500).json({ error: error.message });
  }
};
export const updatecourse = async (req, res) => {
  try {
    const id = req.params.id.trim();
    const userId = req.user.id;
    console.log("Updating course ID:", id, "for user ID:", userId); 

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("Invalid course ID:", id);
      return res.status(400).json({ message: "Invalid course ID" });
    }
    const course = await Course.findOneAndUpdate(
      { _id: id, userId: userId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!course) {
      console.warn("Course not found or user is not authorized to update course ID:", id); 
      return res.status(404).json({ message: "Course not found or not authorized" });
    }
    console.log("Course updated successfully:", course);
    res.json(course);
  } catch (error) {
    console.error("Error updating course:", error.message);
    res.status(400).json({ error: error.message });
  }
};
export const readcourses = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deletecourse = async (req, res) => {
  const userId = req.user.id;
  const courseId = req.params.courseId;
  if (!courseId) {
    return res.status(400).send({ error: 'Course ID is required.' });
  }
  try {
    const result = await ViewCourse.deleteOne({ userId, courseId });
    if (result.deletedCount === 0) {
      return res.status(404).send({ error: 'Course not found in your view records.' });
    }

    res.status(200).send({ message: 'Course removed from your view records.' });
  } catch (error) {
    console.error('Error removing the course:', error);
    res.status(500).send({ error: 'Error removing the course. Please try again later.' });
  }
};


