import skillCollection from "../Model/model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_WEB,{
        expiresIn:"30d",
    });
}
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await skillCollection.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new skillCollection({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await skillCollection.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const pass=await bcrypt.compare(password,user.password);
        if(!pass){
            return res.status(400).json({message:"Invalid credentials"});
        }
         res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                jwt:generateToken(user._id)
            }) 
        
}
catch(err){
    console.error(err);
        res.status(500).json({message:"Server error"});
}
}
