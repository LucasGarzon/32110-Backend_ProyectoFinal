import { Router } from "express";
import { addToCart, deleteCart, getAllCarts, getCartByEmail, removeItem } from "../controllers/cart.controller.js";
import { logChecker } from "../controllers/user.controller.js";

const router = new Router();

router.get("/", logChecker, getAllCarts);
router.get("/:email", logChecker, getCartByEmail);
router.post("/", logChecker, addToCart);
router.post("/remove", logChecker, removeItem);
router.delete("/:email", logChecker, deleteCart);

const cartRouter = router;
export { cartRouter };
