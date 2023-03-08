import UserService from "../services/user.service.js";
import passport from "passport";
import CartService from "../services/cart.service.js";
import "../services/authentication/localStrategy.js";


const userService = new UserService();
const cartService = new CartService();

export const createUser = async (req, res) => {
  try {
    const { email, first_name, last_name, address, phone, password } = req.body;
    const newUser = await userService.createUser({
      email,
      first_name,
      last_name,
      address,
      phone: parseInt(phone), 
      password,
    });
    res.status(201).redirect('/login')
  } catch (error) {
    res.status(400).render('error', { message: error.message });
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
    const userCart = await cartService.getCartById(req.user.email)
    if (userCart) {
      await cartService.deleteCart(req.user.email);
    }
    const deletedUser = await userService.deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    } else {
      req.session.destroy(() => {
        res.redirect(303, "/login");
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const logChecker = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.redirect('/login')
};

export const userAuth = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { 
      return next(err); 
    }
    if (!user) { 
      return res.render('error', { message: info.message }); 
    }
    req.logIn(user, (err) => {
      if (err) { 
        return next(err); 
      }
      return res.redirect('/productos');
    });
  })(req, res, next);
}

export const userLogOut = (req, res, next) => {
  req.logout(function(err) {
    if (err) {
      return next(err)
    }
    res.redirect('/login');
  });
};