import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },

  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "skillCollection",   // your user collection
    required: true,
  },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date }
});

const todoCollection = mongoose.model("todos", todoSchema);
export default todoCollection;
