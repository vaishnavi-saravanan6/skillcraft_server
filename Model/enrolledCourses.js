import mongoose from "mongoose";

const enrolledCourseSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "courses", required: true },
  enrolledAt: { type: Date, default: Date.now },
  progress: { type: Number, default: 0 } // 0-100%
});

const enrolledCoursesCollection = mongoose.model("enrolledCourses", enrolledCourseSchema);

export default enrolledCoursesCollection;
