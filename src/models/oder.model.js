import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderSchema = new Schema({
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
  orderNumber: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
    default: "generated",
  },
  email: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model('Order', OrderSchema)
export default Order