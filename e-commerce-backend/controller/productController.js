const ProductModel = require("../model/ProductModel");

const dummyProducts = [
  {
    id: 1,
    imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzEHRe6qwUg__61qgldYKbyvMS6yhDdyTHLQ&s",
    title: "Clothes",
    description: "Comfortable and stylish clothing for every occasion.",
  },
  {
    id: 2,
    imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYFHqubsxgEDlbHQy-DqJ7gpEX8Honnsv9cQ&s",
    title: "Laptops",
    description: "High-performance laptops for work, gaming, and everyday use.",
  },
  {
    id: 3,
    imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu40lyAEF3ePk1CS3swYqngcJIBufVRo1ouA&s",
    title: "Mobiles",
    description: "Latest smartphones with advanced features and great cameras.",
  },
  {
    id: 4,
    imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcEnHaxGDq08atEEjHNYlHsfEeHXzVw2zeOQ&s",
    title: "Shoes",
    description: "Durable and trendy footwear to keep you moving in style.",
  },
  {
    id: 5,
    imageSrc: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    title: "Watches",
    description: "Elegant timepieces that perfectly complement your outfit.",
  },
  {
    id: 6,
    imageSrc: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    title: "Headphones",
    description: "Noise-cancelling headphones for an immersive audio experience.",
  },
  {
    id: 7,
    imageSrc: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    title: "Bags",
    description: "Spacious and durable bags for travel, school, or work.",
  },
  {
    id: 8,
    imageSrc: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    title: "Sunglasses",
    description: "Protect your eyes with these stylish and polarized sunglasses.",
  }
];

const getAllProducts = async (req, res) => {
    try {
        let products = await ProductModel.find({});
        
        // If collection is empty, seed it automatically
        if (products.length === 0) {
            console.log("Seeding dummy products into MongoDB...");
            await ProductModel.insertMany(dummyProducts);
            products = await ProductModel.find({});
        }
        
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Failed to get products", err: error });
    }
};

const createProduct = async (req, res) => {
    try {
        const { id, imageSrc, title, description } = req.body;
        const newProduct = await ProductModel.create({ id, imageSrc, title, description });
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Failed to create product", err: error });
    }
};

module.exports = { getAllProducts, createProduct };
