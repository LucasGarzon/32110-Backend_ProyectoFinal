import { Router } from "express";
import { createOrder, deleteOrder, getAllOrders, updateOrder } from "../controllers/order.controller.js";

const router = new Router()

router.get('/', getAllOrders)
router.post('/', createOrder)
router.put('/:id', updateOrder)
router.delete('/:id', deleteOrder)

const orderRouter = router;
export { orderRouter }