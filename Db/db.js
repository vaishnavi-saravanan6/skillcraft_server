import mongoose  from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB =()=>{
try{
    mongoose.connect(process.env.MONGODB_URI)
    console.log("DB connected successfully");
}
catch(err){
    console.log("Error in DB connection", err);
}
}
export default connectDB;