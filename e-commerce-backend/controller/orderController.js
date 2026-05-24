const Orders = require("../model/OrdersModel");
const CartProducts = require("../model/CartModel");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { products, totalAmount, shippingDetails } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products provided for order" });
    }

    const newOrder = await Orders.create({
      userId,
      products,
      totalAmount,
      shippingDetails
    });

    // Clear user's cart on order success
    await CartProducts.findOneAndDelete({ userId });

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};

// Retrieve current user's orders
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const userOrders = await Orders.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ orders: userOrders });
  } catch (error) {
    res.status(500).json({ message: "Failed to get user orders", error: error.message });
  }
};

// Admin: Retrieve all orders
const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Orders.find({})
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 });
    res.status(200).json({ orders: allOrders });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve all orders", error: error.message });
  }
};

// Admin: Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await Orders.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status", error: error.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
};
