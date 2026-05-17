const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
     name: { type: String,required: true},
    email: {type: String,required: true,unique: true},
    phone: {type: String,required: true},
    password: {type: String,required: true},
    address: {type: String,required: true},
    city: {type: String,required: true},
    userType: {type: String,required: true},
    state: {type: String,required: true},
    zipCode: {type: String,required: true},
}, {timestamps: true})

const UserModel = mongoose.model("Users", userSchema);
module.exports= UserModel;