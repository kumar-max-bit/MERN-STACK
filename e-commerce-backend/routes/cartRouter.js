const express = require('express');
const router = express.Router();
const {
  addToCart,
  getCartDetails,
  removeCartProduct,
  clearCart
} = require('../controller/cartController');
const verifyToken = require('../middleware/verifyToken');

// All cart operations require token verification middleware
router.post('/add-cart', verifyToken, addToCart);
router.get('/get-cart', verifyToken, getCartDetails);
router.delete('/remove-cart/:productId', verifyToken, removeCartProduct);
router.delete('/clear-cart', verifyToken, clearCart);

module.exports = router;