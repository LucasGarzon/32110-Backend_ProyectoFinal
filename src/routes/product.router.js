import { Router } from "express";
import { getAllProducts, getPrroductById, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const router = Router();

router.get('/', getAllProducts)
router.get('/:id', getPrroductById)
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

const productRouter = router;
export { productRouter };
