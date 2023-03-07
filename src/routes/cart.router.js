import { Router } from "express";
import { addToCart, deleteCart, getAllCarts, getCartByEmail, removeItem } from "../controllers/cart.controller.js";

const router = new Router();

router.get("/", getAllCarts);
router.get("/:email", getCartByEmail);
router.post("/", addToCart);
router.post("/remove", removeItem);
router.delete("/:email", deleteCart);

const cartRouter = router;
export { cartRouter };
