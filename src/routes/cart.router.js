import { Router } from "express";
import { addToCart, deleteCart, getAllCarts, removeItem } from "../controllers/cart.controller.js";

const router = new Router();

router.get("/", getAllCarts);
router.post("/", addToCart);
router.put("/remove", removeItem);
router.delete("/:email", deleteCart);

const cartRouter = router;
export { cartRouter };
