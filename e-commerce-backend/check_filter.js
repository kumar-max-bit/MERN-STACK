const mongoose = require("mongoose");

const run = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/e_commerce_database");
    console.log("Connected");
    const rawDocs = await mongoose.connection.db.collection("products").find({}).toArray();
    console.log("Raw documents in DB:");
    rawDocs.forEach(d => {
      console.log(JSON.stringify(d, null, 2));
    });
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
};

run();
