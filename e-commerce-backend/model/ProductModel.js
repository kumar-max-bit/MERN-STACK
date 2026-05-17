const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    imageSrc: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
}, { timestamps: true });

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;
