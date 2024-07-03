import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, searchProducts } from '../controllers/productController.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/search', searchProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);


export default router;
