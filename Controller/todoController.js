import todoCollection from "../Model/todoModel.js";
export const addTodo = async (req, res) => {
  try {
    const data = new todoCollection({
      todo: req.body.todo,
      userId: req.user._id, 
    });

    await data.save();
    res.status(201).json({ mess: "data has been added" });
  } catch (err) {
    res.status(500).json({ mess: "error in adding todo" });
  }
};
export const getTodo = async (req, res) => {
  try {
    const data = await todoCollection.find({
      userId: req.user._id, 
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ mess: "error in fetching todos" });
  }
};

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
export const completeTodo = async (req, res) => {
  try {
    const todo = await todoCollection.findOne({
      _id: req.params.id,
      userId: req.user._id, 
    });

    if (!todo)
      return res.status(404).json({ mess: "Todo not found" });

    todo.completed = true;
    todo.completedAt = new Date();
    await todo.save();

    res.json({ mess: "Todo completed", todo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mess: "Complete failed" });
  }
};
