import mongoose from "mongoose";

const activitySchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  type: { type: String, enum: ["todo", "course"], required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["completed", "pending"], default: "completed" }
});

const activityCollection = mongoose.model("userActivities", activitySchema);

export default activityCollection;
