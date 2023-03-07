import { Router } from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductCategory } from "../controllers/product.controller.js";
import { logChecker } from "../controllers/user.controller.js";

const router = Router();

router.get('/', logChecker, getAllProducts)
router.get('/:id', logChecker, getProductById)
router.get('/categoria/:category', getProductCategory)
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

const productRouter = router;
export { productRouter };
