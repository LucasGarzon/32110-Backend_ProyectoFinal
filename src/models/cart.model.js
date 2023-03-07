import mongoose from "mongoose";
import Product from "./product.model.js";

const { Schema } = mongoose;

const cartSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  items: [
    {
      product: {
        type: String,
        required: true,
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: { 
        type: Number, 
        default: 1, 
      },
      price : { 
        type: Number, 
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

cartSchema.pre('save', async function(next) {
  try {
    let sum = 0;
    for (let i = 0; i < this.items.length; i++) {
      const product = await Product.findById(this.items[i].productId);
      sum += product.price * this.items[i].quantity;
    }
    this.total = sum;
    next();
  } catch (err) {
    next(err);
  }
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
