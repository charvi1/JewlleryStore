const { User, Product, Cart } = require('../models');

const getCart = async (req, res) => {
  try {
    const { email } = req.body;
    console.log('Get cart request for email:', email);
    
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const user = await User.findOne({ 
      where: { EmailId: email },
      attributes: ['UserId', 'EmailId', 'UserName'],
      logging: console.log
    });
    console.log('Found user:', user ? {
      UserId: user.UserId,
      EmailId: user.EmailId,
      UserName: user.UserName
    } : 'not found');
    
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const cartItems = await Cart.findAll({
      where: { UserID: user.UserId },
      include: [{ 
        model: Product,
        attributes: ['ProductId', 'ProductName', 'UnitPrice', 'ImageURL']
      }],
    });
    console.log('Found cart items:', cartItems.map(item => ({
      CartId: item.CartId,
      UserID: item.UserID,
      ProductID: item.ProductID,
      Quantity: item.Quantity
    })));

    res.status(200).json({ success: true, cart: cartItems });
  } catch (err) {
    console.error('Get cart error details:', {
      message: err.message,
      stack: err.stack,
      name: err.name,
      sql: err.sql,
      sqlMessage: err.sqlMessage
    });
    res.status(500).json({ success: false, message: 'Failed to get cart', error: err.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { email, productId, quantity = 1 } = req.body;
    console.log('Add to cart request:', { email, productId, quantity });
    
    if (!email || !productId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and productId are required' 
      });
    }

    const user = await User.findOne({ 
      where: { EmailId: email },
      attributes: ['UserId', 'EmailId', 'UserName'],
      logging: console.log
    });
    console.log('Found user:', user ? {
      UserId: user.UserId,
      EmailId: user.EmailId,
      UserName: user.UserName
    } : 'not found');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const product = await Product.findByPk(productId);
    console.log('Found product:', product ? {
      ProductId: product.ProductId,
      ProductName: product.ProductName,
      UnitPrice: product.UnitPrice
    } : 'not found');
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check if product is already in cart
    const existingCartItem = await Cart.findOne({
      where: { 
        UserID: user.UserId, 
        ProductID: productId 
      }
    });
    console.log('Existing cart item:', existingCartItem ? {
      CartId: existingCartItem.CartId,
      UserID: existingCartItem.UserID,
      ProductID: existingCartItem.ProductID,
      Quantity: existingCartItem.Quantity
    } : 'not found');

    if (existingCartItem) {
      // Update quantity if item exists
      existingCartItem.Quantity += quantity;
      await existingCartItem.save();
      console.log('Updated existing cart item quantity to:', existingCartItem.Quantity);
    } else {
      // Create new cart item if it doesn't exist
      const newCartItem = await Cart.create({
        UserID: user.UserId,
        ProductID: productId,
        Quantity: quantity
      });
      console.log('Created new cart item:', {
        CartId: newCartItem.CartId,
        UserID: newCartItem.UserID,
        ProductID: newCartItem.ProductID,
        Quantity: newCartItem.Quantity
      });
    }

    // Get updated cart
    const updatedCart = await Cart.findAll({
      where: { UserID: user.UserId },
      include: [{ 
        model: Product,
        attributes: ['ProductId', 'ProductName', 'UnitPrice', 'ImageURL']
      }],
    });
    console.log('Updated cart items count:', updatedCart.length);

    res.status(200).json({ 
      success: true, 
      message: 'Item added to cart', 
      cart: updatedCart 
    });
  } catch (err) {
    console.error('Add to cart error details:', {
      message: err.message,
      stack: err.stack,
      name: err.name,
      sql: err.sql,
      sqlMessage: err.sqlMessage
    });
    res.status(500).json({ 
      success: false, 
      message: 'Failed to add to cart', 
      error: err.message 
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { email, productId } = req.body;
    
    if (!email || !productId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and productId are required' 
      });
    }

    const user = await User.findOne({ where: { EmailId: email } });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const deleted = await Cart.destroy({
      where: { 
        UserID: user.UserId, 
        ProductID: productId 
      }
    });

    if (!deleted) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not in cart' 
      });
    }

    const updatedCart = await Cart.findAll({
      where: { UserID: user.UserId },
      include: [{ 
        model: Product,
        attributes: ['ProductId', 'ProductName', 'UnitPrice', 'ImageURL']
      }],
    });

    res.status(200).json({ 
      success: true, 
      message: 'Item removed from cart', 
      cart: updatedCart 
    });
  } catch (err) {
    console.error('Remove from cart error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to remove from cart', 
      error: err.message 
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { email, productId, quantity } = req.body;
    
    if (!email || !productId || quantity === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email, productId, and quantity are required' 
      });
    }

    const user = await User.findOne({ where: { EmailId: email } });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const cartItem = await Cart.findOne({
      where: { 
        UserID: user.UserId, 
        ProductID: productId 
      }
    });

    if (!cartItem) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not in cart' 
      });
    }

    if (quantity <= 0) {
      await cartItem.destroy();
    } else {
      cartItem.Quantity = quantity;
      await cartItem.save();
    }

    const updatedCart = await Cart.findAll({
      where: { UserID: user.UserId },
      include: [{ 
        model: Product,
        attributes: ['ProductId', 'ProductName', 'UnitPrice', 'ImageURL']
      }],
    });

    res.status(200).json({ 
      success: true, 
      message: 'Cart updated', 
      cart: updatedCart 
    });
  } catch (err) {
    console.error('Update cart error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update cart', 
      error: err.message 
    });
  }
};

const clearCart = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    const user = await User.findOne({ where: { EmailId: email } });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await Cart.destroy({ where: { UserID: user.UserId } });

    res.status(200).json({ 
      success: true, 
      message: 'Cart cleared', 
      cart: [] 
    });
  } catch (err) {
    console.error('Clear cart error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to clear cart', 
      error: err.message 
    });
  }
};

module.exports = { getCart, addToCart, removeFromCart, updateCart, clearCart };
