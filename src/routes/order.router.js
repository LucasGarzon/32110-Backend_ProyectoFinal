import { Router } from "express";
import { createOrder, deleteOrder, getAllOrders, getOrderByEmail, updateOrder } from "../controllers/order.controller.js";
import { logChecker } from "../controllers/user.controller.js";

const router = new Router()

router.get('/', logChecker, getOrderByEmail)
router.get('/admin', logChecker, getAllOrders)
router.post('/', logChecker, createOrder)
router.put('/:id', logChecker, updateOrder)
router.delete('/:id', logChecker, deleteOrder)

const orderRouter = router;
export { orderRouter }