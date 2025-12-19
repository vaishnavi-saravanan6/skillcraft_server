import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import skillCollection from "./Model/model.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin123"; 

    const existingAdmin = await skillCollection.findOne({
      email: adminEmail,
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await skillCollection.create({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created successfully");
    console.log("Email: admin@gmail.com");
    console.log("Password: admin123");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
