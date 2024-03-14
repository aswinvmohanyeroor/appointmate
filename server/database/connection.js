import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// eslint-disable-next-line no-undef
const apiKey = process.env.VITE_MONGODB_URI;

export async function connect() {
  try {
    await mongoose.connect(apiKey, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongoose connected to db");
  } catch (error) {
    console.log(error);
  }
}
