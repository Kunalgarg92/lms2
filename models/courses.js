import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Course title is required"],
  },
  description: {
    type: String,
    required: [true, "Course description is required"],
  },
  instructor: {
    type: String,
    required: [true, "Instructor name is required"],
  },
  duration: {
    type: String,
    required: [true, "Course duration is required"],
  },
  price: {
    type: Number,
    required: [true, "Course price is required"],
  },
  
  userId: { type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
      required: true 
    },
}, { timestamps: true });
const Course = mongoose.model("Course", courseSchema);
export default Course;
