import express from "express";
import protect from "../Middleware/authMiddleware.js";
import Course from "../Model/course.js";

const courseRoute = express.Router();

// GET all courses
courseRoute.get("/all", protect, async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mess: "Failed to fetch courses" });
  }
});

// ENROLL in a course
courseRoute.post("/enroll", protect, async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user._id;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ mess: "Course not found" });

    if (course.enrolledUsers.includes(userId))
      return res.status(400).json({ mess: "Already enrolled" });

    course.enrolledUsers.push(userId);
    await course.save();

    res.status(200).json({ mess: "Enrolled successfully", course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mess: "Failed to enroll" });
  }
});

// GET user enrolled courses
courseRoute.get("/enrolled", protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const enrolledCourses = await Course.find({ enrolledUsers: userId });
    res.json(enrolledCourses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mess: "Failed to fetch enrolled courses" });
  }
});
// CREATE a course (admin only)
courseRoute.post("/create", protect, async (req, res) => {
  try {
    const { title, description, category, duration, price } = req.body;

    const course = new Course({
      title,
      description,
      category,
      duration,
      price,
      createdBy: req.user._id
    });

    await course.save();
    res.status(201).json({ mess: "Course created successfully", course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mess: "Error creating course" });
  }
});


export default courseRoute;
