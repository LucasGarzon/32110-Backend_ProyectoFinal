import { Router } from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductCategory } from "../controllers/product.controller.js";
import { logChecker } from "../controllers/user.controller.js";

const router = Router();

router.get('/', logChecker, getAllProducts)
router.get('/:id', logChecker, getProductById)
router.get('/categoria/:category', logChecker, getProductCategory)
router.post('/', logChecker, createProduct)
router.put('/:id', logChecker, updateProduct)
router.delete('/:id', logChecker, deleteProduct)

const productRouter = router;
export { productRouter };
