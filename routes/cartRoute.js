import express from 'express';
import { addToCart, checkout,removeFromCart,getUserCartItems } from '../controllers/cartController.js';

const router = express.Router();

router.post('/add', addToCart);
router.post('/remove', removeFromCart);
router.post('/checkout', checkout);
router.get('/getCartItems/:userId', getUserCartItems);

export default router;
