const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  productsIds: [{ type: mongoose.Types.ObjectId, ref: "products", required: true }],
  totalPrice: { type: Number, default: 0, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);

