import todoCollection from "../Model/todoModel.js";
 export const addTodo=async(req,res)=>{
    try{
        const data=new todoCollection(req.body);
        await data.save();
        res.status(201).json({mess:"data has been added"})
    }
    catch(err){
        res.status(500).json({mess:"error in adding todo"})
 }
}
export const getTodo = async (req, res) => {
    try {
        const data = await todoCollection.find();
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ mess: "error in fetching todos" })
    }
}
export const updateTodo = async (req,res)=>{
    try{
        const data = await todoCollection.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(data);
    }
    catch(err){
        res.status(500).json({ mess: "error in updating todo" })
    }
}
export const deleteTodo = async (req, res) => {
    try{
        const de = await todoCollection.findByIdAndDelete(req.params.id);
        res.status(200).json({ mess: "todo deleted successfully" });
    }
    catch(err){
        res.status(500).json({ mess: "error in deleting todo" })
    }
}