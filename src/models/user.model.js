import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
  },
  last_name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isAdming: {
    type: Boolean,
    default: false,
  },
});

UserShema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model("User", UserShema);
export default User;
