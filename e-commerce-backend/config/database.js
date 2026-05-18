const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = require("../model/UserModel");


const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        // 1. Delete any old placeholder users with email containing "alphamart"
        const deleteRes = await UserModel.deleteMany({ email: /alphamart/i });
        if (deleteRes.deletedCount > 0) {
            console.log(`Cleaned up ${deleteRes.deletedCount} placeholder alphamart accounts.`);
        }

        // 2. Check and auto-create the main admin account for kumarking6191@gmail.com
        const adminEmail = "kumarking6191@gmail.com";
        const existingAdmin = await UserModel.findOne({ email: adminEmail });
        
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash("Password123", 10);
            await UserModel.create({
                name: "Kumar Admin",
                email: adminEmail,
                phone: "9876543210",
                password: hashedPassword,
                address: "Alpha Mart Head Office",
                city: "Hyderabad",
                state: "Telangana",
                zipCode: "500001",
                userType: "admin"
            });
            console.log(`Auto-seeded main admin account: ${adminEmail} (Password: Password123)`);
        } else {
            console.log(`Main admin account ${adminEmail} is active and ready.`);
        }

    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
}

module.exports= connection;
