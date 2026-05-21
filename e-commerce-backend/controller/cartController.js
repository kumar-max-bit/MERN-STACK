const CartProducts = require("../model/CartModel");
const Products = require("../model/ProductModel");

//add to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { productId } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await CartProducts.findOne({ userId });
    if (cart) {
      cart.productsIds.push(productId);
      cart.totalPrice += product.price;
      await cart.save();
      return res.status(200).json({ message: "Product added to cart", cart });
    }

    cart = await CartProducts.create({
      userId,
      productsIds: [productId],
      totalPrice: product.price,
    });

    return res.status(201).json({ message: "Cart created", cart });
  } catch (error) {
    return res.status(500).json({ message: "failed to add to cart", error: error.message });
  }
};

//get cart details
const getCartDetails = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const cart = await CartProducts.findOne({ userId }).populate("productsIds");
    if (!cart) {
      return res.status(200).json({
        message: "Cart is empty",
        cart: { userId, productsIds: [], totalPrice: 0 },
      });
    }z

    return res.status(200).json({ cart });
  } catch (error) {
    return res.status(500).json({ message: "failed to get cart details", error: error.message });
  }
};

//remove cart products based on id
const removeCartProduct = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { productId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const cart = await CartProducts.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const index = cart.productsIds.indexOf(productId);
    if (index === -1) {
      return res.status(400).json({ message: "Product not found in cart" });
    }

    // Remove one instance of the product ID
    cart.productsIds.splice(index, 1);

    // Recalculate total price
    let newTotalPrice = 0;
    if (cart.productsIds.length > 0) {
      const products = await Products.find({ _id: { $in: cart.productsIds } });
      const priceMap = {};
      products.forEach((p) => {
        priceMap[p._id.toString()] = p.price;
      });
      cart.productsIds.forEach((id) => {
        newTotalPrice += priceMap[id.toString()] || 0;
      });
    }
    cart.totalPrice = newTotalPrice;
    await cart.save();

    return res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    return res.status(500).json({ message: "failed to remove product from cart", error: error.message });
  }
};

//clear cart
const clearCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const cart = await CartProducts.findOneAndDelete({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    return res.status(500).json({ message: "failed to clear cart", error: error.message });
  }
};

module.exports = {
  addToCart,
  getCartDetails,
  removeCartProduct,
  clearCart,
};