import OrderService from "../services/order.service.js";
import transporter from "../services/mailer.service.js";
import * as dotenv from "dotenv";

dotenv.config();
const orderSevice = new OrderService();

export const getAllOrders = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const result = await orderSevice.getAllOrders();
      if (result.length === 0) {
        res.status(404).render('error', { message: "BD don't have any order" });
      } else {
        res.status(200).render('adminOrders', {orders: result})
      }
    } else {
      res.status(404).render('error', { message: "You don't have admin permissions" });
    }

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getOrderByEmail = async (req, res) => {
  const { email } = req.user
  try {
    const result = await orderSevice.getOrderByEmail(email)
    if (!result) {
      res.status(404).render('error', { message: "BD don't have any order" });
    } else {
      res.status(200).render('orders', {orders: result})
    }
  } catch (error) {
    res.status(404).render('error', { message: error.message });
  }
}

export const createOrder = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await orderSevice.createOrder(email)
    let products = "";
    for (const prod of result.items) {
      products += `<li>${prod.quantity} X ${prod.product}____$${prod.price}</li>`; 
    }
    await transporter.sendMail({
      from: process.env.ADMIN_MAIL,
      to: email,
      subject: `¡Tienes una orden de compra de ${req.user.first_name} ${req.user.last_name}!`,
      html: `
        <h2 style="color: blue;">Carrito:</h2>
        <ul>
          <li>Items:</li>
          ${products}
          <li>Total:$ <span style="color:green">${result.total}</span></li>
        </ul>
        <hr>
        <h2 style="color: blue;">Datos del usuario:</h2>
        <ul>
          <li>Email: <span style="color:blue">${req.user.email}</span></li>
          <li>Nombre: <span style="color:blue">${req.user.first_name}</span></li>
          <li>Apellido: <span style="color:blue">${req.user.last_name}</span></li>
          <li>Teléfono: <span style="color:blue">${req.user.phone}</span></li>
          <li>Dirección de entrega: <span style="color:blue">${req.user.address}</span></li>
        </ul>
      `,
    });
    res.status(200).redirect('/productos');
  } catch (error) {
    res.status(404).render('error', { message: error.message });
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