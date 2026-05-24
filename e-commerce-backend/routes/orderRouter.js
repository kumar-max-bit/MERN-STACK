const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const isAdmin = require("../middleware/authAdmin");
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} = require("../controller/orderController");

const router = express.Router();

router.post("/place", verifyToken, createOrder);
router.get("/my-orders", verifyToken, getUserOrders);
router.get("/all", verifyToken, isAdmin, getAllOrders);
router.patch("/:orderId/status", verifyToken, isAdmin, updateOrderStatus);

module.exports = router;
