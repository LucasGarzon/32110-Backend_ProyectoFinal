import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    require: true,
    maxlength: 48,
  },
  price: {
    type: Number,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
    min: 0,
  },
  category: {
    type: Number, 
    require: true,
    default: 1,
  },
  thumbnail: {
    type: String,
    require: true,
    maxlength: 256,
  },
  description: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
