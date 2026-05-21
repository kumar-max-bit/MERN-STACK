const Products = require("../model/ProductModel");

// add product
const addProducts = async (req, res) => {
  try {
    console.log(req.body);
    const newProduct = {
      name: req.body.name,
      price: Number(req.body.price),
      description: req.body.description,
      ratings: req.body.ratings,
      imageSrc: req.body.imageSrc,
      about: req.body.about,
      reviews: req.body.reviews,
    };
    const createdProduct = await Products.create(newProduct);
    res.status(201).json({ message: "Product Added", createdProduct });
  } catch (err) {
    res.status(500).json({ message: "Failed add Product", error: err });
  }
};

//edit productDetails
const editProducts = async (req, res) => {
  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.status(200).json({ message: "updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "failed to update details" });
  }
};

//delete products
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Products.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product Deleted", deletedProduct });
  } catch (error) {
    res.status(500).json({ message: "failed to Delete", error });
  }
};

//get product based on ID
const getProductBasedOnId = async (req, res) => {
  try {
    const foundProduct = await Products.findById(req.params.id);
    res.status(200).json({ foundProduct });
  } catch (error) {
    res.status(500).json({ message: "failed get Product", error });
  }
};

//get all products
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Products.find();
    res.status(200).json({ allProducts });
  } catch (error) {
    res.status(500).json({ message: "failed get all Product", error });
  }
};

//filter products based on price
const filterProductsBasedOnPrice = async (req, res) => {
  try {
    const min = Number(req.query.min) || 0;
    const max = Number(req.query.max) || Infinity;
    const filteredProducts = await Products.find({
      price: { $gte: min, $lte: max },
    });
    res.status(200).json({ filteredProducts });
  } catch (error) {
    console.error("Filter error:", error);
    res.status(500).json({ message: "failed to filter", error: error.message });
  }
};

//sort products based on price
const sortProductsBasedOnPrices = async (req, res) => {
  try {
    const order = req.query.order || req.params.order;
    const sortOrder = order === "desc" || order === "-1" ? -1 : 1;
    const sortedProducts = await Products.find().sort({ price: sortOrder });
    res.status(200).json({ sortedProducts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to sort, internal server error", error });
  }
};

module.exports = {
  addProducts,
  editProducts,
  deleteProduct,
  getProductBasedOnId,
  filterProductsBasedOnPrice,
  sortProductsBasedOnPrices,
  getAllProducts
};
