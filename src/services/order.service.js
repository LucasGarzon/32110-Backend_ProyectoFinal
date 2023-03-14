import Order from "../models/oder.model.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export default class OrderService {
  async getAllOrders() {
    return await Order.find()
  }

  async getOrderByEmail(userEmail) {
    return await Order.find({ email: userEmail })
  }

  async createOrder(cartEmail) {
    const cart = await Cart.findOne({ email: cartEmail });
    if (!cart) {
      throw new Error(`El usaurio ${cartEmail} no registra ningún carrito`);
    }
    const newOrder = await Order.create({
      email: cart.email,
      items: cart.items,
      total: cart.total,
      orderNumber: await Order.countDocuments({}) + 1,
    });
    for (const item in cart.items) {
      let product = await Product.findById(cart.items[item].productId);
      let quantity = cart.items[item].quantity;
      product.stock = product.stock - quantity
      product.save()
    }
    await Cart.findOneAndRemove( { email: cartEmail });
    return newOrder
  }

  async updateOrder(id, newStatus) {
    const result = await Order.findById(id);
    if (!result) throw new Error(`No se ha encontrado una orden con id '${id}'`);
    result.status = newStatus;
    await result.save();
    return result;
  }

  async deleteOrder(id) {
    const result = await Order.findById(id)
    if (!result) throw new Error(`No se ha encontrado una orden con id '${id}'`)
    return await Order.findByIdAndDelete(id)
  }
}

