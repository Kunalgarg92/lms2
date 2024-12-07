import ViewCourse from '../models/viewcourses.js';
export const viewcourses = async (req, res) => {
  try {
    console.log("Request received at /api/viewcourses");
    const { courseId } = req.body;
    const userId = req.user.id;
    if (!courseId) {
      return res.status(400).json({ message: "Bad Request: No course ID provided" });
    }
    const existingCourse = await ViewCourse.findOne({ userId, courseId });
    if (existingCourse) {
      if (!existingCourse.isBought) {
        existingCourse.isBought = true;
        await existingCourse.save();
        return res.status(200).json({
          message: "Successfully enrolled in the course",
          course: existingCourse,
        });
      }
      return res.status(409).json({ message: "You are already enrolled in this course." });
    }
    const newEnrollment = new ViewCourse({
      userId,
      courseId,
      isAdded: true,
      isBought: true,
    });
    await newEnrollment.save();
    return res.status(200).json({
      message: "Successfully added and enrolled in the course",
      course: newEnrollment,
    });
  } catch (error) {
    console.error("Error processing course enrollment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const enrolledCourses = await ViewCourse.find({ userId, isAdded: true }).populate('courseId');
    return res.status(200).json(enrolledCourses);
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
