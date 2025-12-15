import mongoose from "mongoose";
const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
    password:{
    type: String,
    required: true,
  }
});
const skillCollection = mongoose.model("skillCollection", skillSchema);
export default skillCollection;