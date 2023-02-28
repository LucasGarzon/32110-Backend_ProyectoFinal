import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

class UserService {
  async createUser(user) {
    const { email, first_name, last_name, password, address } = user;
    const userExists = await User.exists({ email });
    if (userExists) throw new Error(`${email} already exists`);
    const hash = await bcrypt.hash(password, 12);
    return await User.create({
      email,
      first_name,
      last_name,
      password: hash,
      address,
    });
  }

  async getUsers() {
    return await User.find()
  }

  async updateUser(id, field, value) {
    const user = await User.findById(id);
    if (!user) throw new Error(`User with id ${id} not found`);
    user[field] = value;
    await user.save();
    return user;
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }
}

export default UserService;