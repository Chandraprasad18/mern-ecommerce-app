import express from 'express';
import {
    addToCart,
    decreaseProductQty,
    clearCart,
    removeProductFromCart,
    userCart,
    increaseQty   
} from '../Controllers/cart.js';


import { Authenticated } from '../Middlewares/auth.js';

const router = express.Router();

// Add to cart
router.post('/add', Authenticated, addToCart);

// Get user cart
router.get('/user', Authenticated, userCart);

// Remove product
router.delete('/remove/:productId', Authenticated, removeProductFromCart);

// Clear cart
router.delete('/clear', Authenticated, clearCart);

// Decrease quantity
router.post('/decrease-qty', Authenticated, decreaseProductQty);



// increase qty
router.post('/increase', Authenticated, increaseQty);


//remove product



export default router;