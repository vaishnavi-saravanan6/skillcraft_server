import express from "express";
import protect from "../Middleware/authMiddleware.js";
import skillCollection from "../Model/model.js";
import activityCollection from "../Model/userActivities.js";
import enrolledCoursesCollection from "../Model/enrolledCourses.js";

const profileRoute = express.Router();

profileRoute.get("/", protect, async (req, res) => {
  try {
    const user = await skillCollection.findById(req.user._id).select("-password");
    const activities = await activityCollection.find({ userId: req.user._id }).sort({ date: -1 });
    const courses = await enrolledCoursesCollection.find({ userId: req.user._id });

    // calculate streak
    const streak = calculateStreak(activities);

    res.json({ user, activities, courses, streak });
  } catch (err) {
    console.error("PROFILE ERROR 👉", err);
    res.status(500).json({ mess: "Failed to fetch profile" });
  }
});

// helper function for streak
function calculateStreak(activities) {
  if (!activities.length) return 0;
  let streak = 0;
  let today = new Date();
  today.setHours(0,0,0,0);
  
  for (let i = 0; i < activities.length; i++) {
    let activityDate = new Date(activities[i].date);
    activityDate.setHours(0,0,0,0);
    if (activityDate.getTime() === today.getTime()) {
      streak++;
      today.setDate(today.getDate() - 1);
    } else if (activityDate.getTime() === today.getTime() - 24*60*60*1000) {
      streak++;
      today.setDate(today.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export default profileRoute;
