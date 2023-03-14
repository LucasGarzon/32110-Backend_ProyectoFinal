import CartService from "../services/cart.service.js";

const cartService = new CartService()

export const getAllCarts = async (req, res) => {
  try {
    const result = await cartService.getAllCarts()
    if (result.length === 0) {
      res.status(200).json({ message: "No existen carritos en nuestra base de datos" })
    } else {
      res.status(200).json(result)
    }
  } catch (error) {
    res.status(404).render('error', { message: error.message });
  }
}; 

export const getCartByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const result = await cartService.getCartByEmail(email);
    if (!result) {
      res.status(200).render('cart', {user: req.user, userCart: false})
    } else {
      res.status(200).render('cart', {user: req.user, userCart: result})
    }
  } catch (error) {
    res.status(404).render('error', { message: error.message });
  }
};

export const addToCart = async (req, res) => {
  const { userEmail, productId } = req.body;
  try {
    const result = await cartService.addToCart(userEmail, productId)
    res.status(200).redirect('/productos');
  } catch (error) {
    res.status(404).render('error', { message: error.message });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const result = await cartService.deleteCart(req.user.email)
    if (!result) {
      return res.status(404).render('error', { message: "No hemos encontrado el carrito" });
    } else {
      res.redirect(303, '/carrito');
    }    
  } catch (error) {
    res.status(404).render('error', { message: error.message });
  }
};

export const removeItem = async (req, res) => {
  const { userEmail, productId } = req.body;
  try {
    const result = await cartService.removeFromCart(userEmail, productId)
    res.status(200).redirect(`/carrito/${userEmail}`);
  } catch (error) {
    res.status(404).render('error', { message: error.message });
  }
};