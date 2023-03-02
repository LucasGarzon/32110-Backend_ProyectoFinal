import CartService from "../services/cart.service.js";

const cartService = new CartService()

export const getAllCarts = async (req, res) => {
  try {
    const result = await cartService.getAllCarts()
    if (result.length === 0) {
      res.status(200).json({ message: "BD don't have any cart" })
    } else {
      res.status(200).json(result)
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}; 

export const getCartById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await cartService.getCartById(id);
    if (!result) {
      res.status(404).json({ message: "Cart not found" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  const { userEmail, productId } = req.body;
  try {
    const result = await cartService.addToCart(userEmail, productId)
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteCart = async (req, res) => {
  const { userEmail } = req.body;
  try {
    const result = await cartService.deleteCart(userEmail)
    if (!result) {
      return res.status(404).json({ message: "Cart not found" });
    } else {
      res.status(200).json({ message: "Cart deleted successfully" });
    }    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const removeItem = async (req, res) => {
  const { userEmail, productId } = req.body;
  try {
    const result = await cartService.removeFromCart(userEmail, productId)
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};