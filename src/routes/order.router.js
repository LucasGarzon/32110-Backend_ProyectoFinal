import { Router } from "express";
import { createOrder, deleteOrder, getAllOrders, updateOrder } from "../controllers/order.controller.js";
import { logChecker } from "../controllers/user.controller.js";

const router = new Router()

router.get('/', logChecker, getAllOrders)
router.post('/', createOrder)
router.put('/:id', updateOrder)
router.delete('/:id', deleteOrder)

const orderRouter = router;
export { orderRouter }