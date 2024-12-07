import mongoose from "mongoose";
const viewCourses = new mongoose.Schema({
   userId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
   },
   courseId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
   },
   isAdded:{
    type: Boolean,
    default: false
   },
   isBought:{
    type: Boolean,
    default: false
   }
});
const ViewCourse = mongoose.model('viewCourse',viewCourses);

export default ViewCourse;
