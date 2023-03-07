import OrderService from "../services/order.service.js";
import nodemailer from 'nodemailer';
import transporter from "../services/mailer.service.js";

const orderSevice = new OrderService();

export const getAllOrders = async (req, res) => {
  try {
    const result = await orderSevice.getAllOrders();
    if (result.length === 0) {
      res.status(200).json({ message: "BD don't have any cart" })
    } else {
      res.status(200).json(result)
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createOrder = async (req, res) => {
  const { email } = req.body;
  try {
    await transporter.sendMail({
      from: 'lucasgarzonm@gmail.com',
      to: email,
      subject: 'Confirmación de orden',
      text: ``,
    });
    res.status(200).json(await orderSevice.createOrder(email));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { newStatus } = req.body;
  try {
    res.status(200).json(await orderSevice.updateOrder(id, newStatus));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    res.status(200).json(await orderSevice.deleteOrder(id));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}