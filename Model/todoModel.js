//define ur model schema
import mongoose from 'mongoose';

//todo document structure
const todoSchema =  mongoose.Schema({
    todo: { type: String, required: true, unique: true }
})

//we r creating a collection named 'todos' using todoSchema
const todoCollection = mongoose.model("todos", todoSchema);

export default todoCollection;