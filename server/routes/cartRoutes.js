const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCart,
  clearCart,
} = require('../controllers/cartController');

// You can protect these routes with auth middleware if you want

router.post('/get', getCart);
router.post('/add', addToCart);
router.post('/remove', removeFromCart);
router.post('/update', updateCart);
router.post('/clear', clearCart);

module.exports = router;
