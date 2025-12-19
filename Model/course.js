import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  duration: String,
  price: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "skillCollection" },
  enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "skillCollection" }]
}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);
export default Course;
