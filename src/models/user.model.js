import mongoose from "mongoose";

const { Schema } = mongoose;

const UserShema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  first_name: {
    type: String,
    require: true,
    unique: true,
  },
  last_name: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserShema);
export default User;
