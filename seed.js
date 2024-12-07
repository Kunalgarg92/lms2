// seed.js
import mongoose from "mongoose";
import Course from "./models/courses.js"; 
import User from "../server/models/user.js";    
import ViewCourse from "./models/viewcourses.js";

const seedDatabase = async () => {
    try {
     
        await mongoose.connect("mongodb://localhost:27017/users1", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected!");
        const courses = [
            {
                title: "Introduction to JavaScript",
                description: "Learn the basics of JavaScript, the most popular programming language.",
                instructor: "John Doe",
                duration: "4 weeks",
                price: 99,
                //courseImage: "https://example.com/javascript.jpg",
            },
            {
                title: "Advanced Python",
                description: "Take your Python skills to the next level with this advanced course.",
                instructor: "Jane Smith",
                duration: "6 weeks",
                price: 199,
                //courseImage: "https://example.com/python.jpg",
            },
        ];
        await Course.deleteMany({});
        const createdCourses = await Course.insertMany(courses);
        console.log("Courses seeded!");
        const users = [
            {
                username: "john_doe",
                email: "john.doe@example.com",
                password: "password123",
            },
            {
                username: "jane_smith",
                email: "jane.smith@example.com",
                password: "password123",
            },
        ];
        await User.deleteMany({});
        const createdUsers = await User.insertMany(users);
        console.log("Users seeded!");
        const viewCourses = [
            {
                userId: createdUsers[0]._id,
                courseId: createdCourses[0]._id,
                isAdded: true,
                isBought: false,
            },
            {
                userId: createdUsers[1]._id,
                courseId: createdCourses[1]._id,
                isAdded: true,
                isBought: true,
            },
        ];
        await ViewCourse.deleteMany({});
        await ViewCourse.insertMany(viewCourses);
        console.log("ViewCourses seeded!");
        mongoose.connection.close();
        console.log("Database connection closed!");
    } catch (error) {
        console.error("Error seeding the database:", error);
        mongoose.connection.close();
    }
};

seedDatabase();
