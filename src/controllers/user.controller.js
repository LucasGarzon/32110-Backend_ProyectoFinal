import UserService from "../services/user.service.js";

const userService = new UserService();

export const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    if (users.length === 0)
      return res.status(200).json({ message: "BD don't have any User" });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { field, value } = req.body;
  try {
    if (!field || !value) return res.status(404).json({ message: "Some body data is missing" });
    const result = await userService.updateUser(id, field, value);
    res.status(201).json({ message: "User updated successfully", product: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userService.deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
