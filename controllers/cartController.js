import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';

export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found.' });
    }

    const existingProductIndex = user.cart.findIndex(item => String(item.product) === productId);
    if (existingProductIndex !== -1) {
      user.cart[existingProductIndex].quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity:quantity ? quantity:1 });
    }

    await user.save();
    res.status(200).json({ success: true, message: 'Product added to cart successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



export const removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found.' });
      }
  
      const productIndex = user.cart.findIndex(item => String(item.product) === productId);
      if (productIndex === -1) {
        return res.status(404).json({ success: false, error: 'Product not found in cart.' });
      }
  
      user.cart.splice(productIndex, 1);
      await user.save();
  
      res.status(200).json({ success: true, message: 'Product removed from cart successfully.' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  


export const checkout = async (req, res) => {
  const { userId, products, totalAmount } = req.body;

  try {
    const user = await User.findById(userId).populate('cart.product');
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }

    const order = new Order({
      user: userId,
      products: user.cart.map(item => ({ product: item.product._id, quantity: item.quantity })),
      totalAmount,
    });

    await order.save();
    user.cart = [];
    await user.save();

    res.status(200).json({ success: true, message: 'Checkout successful.', order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const getUserCartItems = async (req, res) => {
    const userId = req.params.userId;
    
    try {
      // Fetch user's cart items from the User model
      const user = await User.findById(userId).populate('cart.product');
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      res.status(200).json({ success: true, cartItems: user.cart });
    } catch (error) {
      console.error("Error fetching user cart items:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
