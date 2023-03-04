import Order from "../models/oder.model.js";
import Cart from "../models/cart.model.js";

export default class OrderService {
  async getAllOrders() {
    return await Order.find()
  }

  async createOrder(cartEmail) {
    const cart = await Cart.findOne({ email: cartEmail });
    if (!cart) {
      throw new Error(`Cart for ${cartEmail} does not exist`);
    }
    const newOrder = await Order.create({
      email: cart.email,
      items: cart.items,
      orderNumber: await Order.countDocuments({}) + 1,
    });
    await Cart.findOneAndRemove( { email: cartEmail });
    return newOrder
  }

  async updateOrder(id, newStatus) {
    const result = await Order.findById(id);
    if (!result) throw new Error(`Order with id ${id} not found`);
    result.status = newStatus;
    await result.save();
    return result;
  }

  async deleteOrder(id) {
    const result = await Order.findById(id)
    if (!result) throw new Error(`Order with id '${id}' not found`)
    return await Order.findByIdAndDelete(id)
  }
}
