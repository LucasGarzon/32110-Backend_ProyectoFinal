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
    if (product.stock < 1 ) throw new Error(`No hay stock para este producto`);
    if (!user) throw new Error(`No se ha encontrado un usuario con email: ${userEmail}`);
    if (!product) throw new Error(`No se ha encontrado un producto con id: '${productId}'`)
    if (!result) {
      return await Cart.create({ email: user.email, items: [{ productId, product: product.title, quantity: 1, price: product.price, thumbnail: product.thumbnail}], total: product.price, address: user.address, phone: user.phone})
    } else {
      const itemIndex = result.items.findIndex(item => item.productId.toString() === productId.toString());
      if (itemIndex >= 0) {
        if (result.items[itemIndex].quantity === product.stock ) throw new Error ("Alcanzaste la cantidad disponible para este producto")
        result.items[itemIndex].quantity++;
      } else {
        result.items.push({ productId, product: product.title, quantity: 1, price: product.price, thumbnail: product.thumbnail});
      };
      await result.save();
      return result;
    }
  }

  async removeFromCart(userEmail, productId) {
    const result = await Cart.findOne({ email: userEmail });
    if (!result) {
      throw new Error("El carrito no existe");
    } else {
      result.items = result.items.filter(item => item.productId.toString() !== productId.toString());
      if (result.items.length === 0) {
        await Cart.findOneAndRemove( { email: userEmail });
        return {message: "Carrito eliminado exitosamente"}
      } else {
        await result.save();
        return result;
      }
    }
  }

  async deleteCart(userEmail) {
    const result = await Cart.findOne({ email: userEmail });
    if (!result) throw new Error(`No se ha encontrado un carrito para el usuraio con id: '${id}'`)
    return await Cart.findOneAndRemove( { email: userEmail });
  }
}


