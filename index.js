import connectDB from "./Db/db.js";
import express from "express";
import cors from "cors";
import todoroute from "./Routes/todoRoutes.js";
import router from "./Routes/routes.js";
import dotenv from "dotenv";

dotenv.config();
connectDB();

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());


app.use("/skillcraft", router);
app.use("/todo", todoroute);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
