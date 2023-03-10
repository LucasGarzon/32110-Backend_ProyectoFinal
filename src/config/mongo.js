import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/proyectoFinal";

export default async function initDB() {
  try {
    await mongoose.set('strictQuery', false)
    await mongoose.connect(uri);
    console.log("MongoDB connected!");
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
  }
}
