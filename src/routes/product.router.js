import { Router } from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductCategory } from "../controllers/product.controller.js";

const router = Router();

router.get('/', getAllProducts)
// router.get('/:id', getProductById)
router.get('/:category', getProductCategory)
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

const productRouter = router;
export { productRouter };
