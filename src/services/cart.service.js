import Cart from "../models/cart.model.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js"

export default class CartService {
  async getAllCarts() {
    return await Cart.find();
  }

  async getCartByEmail(userEmail) {
    return await Cart.findOne({ email: userEmail });
  }

  async addToCart(userEmail, productId) {
    const result = await Cart.findOne({ email: userEmail });
    const user = await User.findOne({ email: userEmail });
    const product = await Product.findById(productId);
    if (product.stock < 1 ) throw new Error(`This product don't have stock`);
    if (!user) throw new Error(`Email ${userEmail} doesn't exists`);
    if (!product) throw new Error(`Product id '${userEmail}' doesn't exists`)
    if (!result) {
      return await Cart.create({ email: user.email, items: [{ productId, product: product.title, quantity: 1, price: product.price}], total: product.price, address: user.address, phone: user.phone})
    } else {
      const itemIndex = result.items.findIndex(item => item.productId.toString() === productId.toString());
      if (itemIndex >= 0) {
        if (result.items[itemIndex].quantity === product.stock ) return ({message: "Superaste la cantidad del stock"})
        result.items[itemIndex].quantity++;
      } else {
        result.items.push({ productId, product: product.title, quantity: 1, price: product.price});
      };
      await result.save();
      return result;
    }
  }

  async removeFromCart(userEmail, productId) {
    const result = await Cart.findOne({ email: userEmail });
    if (!result) {
      throw new Error("Cart doesn't exists");
    } else {
      result.items = result.items.filter(item => item.productId.toString() !== productId.toString());
      if (result.items.length === 0) {
        await Cart.findOneAndRemove( { email: userEmail });
        return {message: "Cart removed succesfully"}
      } else {
        await result.save();
        return result;
      }
    }
  }

  async deleteCart(userEmail) {
    const result = await Cart.findOne({ email: userEmail });
    if (!result) throw new Error(`Cart of user '${id}' not found`)
    return await Cart.findOneAndRemove( { email: userEmail });
  }
}


