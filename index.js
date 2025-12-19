import connectDB from "./Db/db.js";
import express from "express";
import cors from "cors";
import todoroute from "./Routes/todoRoutes.js";
import router from "./Routes/routes.js";
import courseRoutes from "./Routes/courseRoutes.js";
import dotenv from "dotenv";
import userRoute from "./Routes/userRoute.js";

dotenv.config();
connectDB();

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

// User/Auth routes
app.use("/skillcraft", router);

// Todo routes
app.use("/todo", todoroute);

// Course routes
app.use("/course", courseRoutes);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
