import mongoose from "mongoose";

const teacherScheme = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  category: String,
  image: String,
  description: String,
  phone: String,
});

export const Teacher = mongoose.model("Teacher", teacherScheme);
