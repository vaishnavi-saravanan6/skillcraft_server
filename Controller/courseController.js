import Course from "../Model/course.js";


export const createCourse = async (req, res) => {
  try {
    const { title, description, category, duration, price } = req.body;
    const createdBy = req.userName || "Admin"; 

    const newCourse = new Course({
      title,
      description,
      category,
      duration,
      price,
      createdBy,
    });

    await newCourse.save();
    res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Enroll a user in a course
export const enrollCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.userId; // from token

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (!course.enrolledUsers.includes(userId)) {
      course.enrolledUsers.push(userId);
      await course.save();
    }

    res.json({ message: "Enrolled successfully", course });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
