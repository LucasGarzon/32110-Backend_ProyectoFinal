import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const uri = process.env.USER_URI || "mongodb://localhost:27017/proyectoFinal";

export default async function startDB() {
  try {
    await mongoose.set('strictQuery', false)
    await mongoose.connect(uri);
    console.log("MongoDB connected!");
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
  }
}
