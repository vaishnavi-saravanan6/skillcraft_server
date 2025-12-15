import { addTodo ,getTodo,updateTodo,deleteTodo} from "../Controller/todoController.js";
import express from "express";
const todoroute=express.Router();
todoroute.post("/addtodo",addTodo);
todoroute.get("/gettodo",getTodo);
todoroute.put("/updatetodo/:id",updateTodo);
todoroute.delete("/deletetodo/:id",deleteTodo);
export default todoroute;
