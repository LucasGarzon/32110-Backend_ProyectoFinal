import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema({
  email: {
    type: String,
    required: true,
  }, 
  userType: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: new Date()
  },
  message: {
    type: String,
    required: true,
  }
});

const Message = mongoose.model("Messages", messageSchema);
export default Message;
