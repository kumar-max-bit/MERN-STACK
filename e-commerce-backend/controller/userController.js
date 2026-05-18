const Users=require("../model/UserModel")

const bcrypt= require("bcrypt");

const register= async(req,res)=>{
    console.log("--- REGISTER ATTEMPT ---");
    console.log("Received data:", req.body);
    try {
        const {name,email,phone,password,address,city,userType,state,zipCode}= req.body;
        
        // Check if user already exists
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            console.log("Registration failed: User already exists with email", email);
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const hashedPassword= await bcrypt.hash(password,10);
        const NewUser= {
           name:name,
           email:email,
           phone:phone,
           password:hashedPassword,
           address:address,
           city:city,
           userType:userType,
           state:state,
           zipCode:zipCode
        }
        const user= await Users.create(NewUser);
        console.log("Registration successful for user:", email);
        res.status(200).json({message:"User registered successfully",});
    } catch (error) {
        console.error("Registration database error:", error);
        res.status(500).json({message:"failed to register user",err:error});
    }
};




//login handler 
const login= async(req,res)=>{
    console.log("--- LOGIN ATTEMPT ---");
    console.log("Received data:", req.body);
    try {
       const {username,password}= req.body;
       const foundUser= await Users.findOne({email:username});
       
       if (!foundUser) {
           console.log("Login failed: User not found with email", username);
           return res.status(404).json({message: "User not found"});
       }

       const isPasswordValid = await bcrypt.compare(password, foundUser.password);
       if (!isPasswordValid) {
           console.log("Login failed: Invalid password for", username);
           return res.status(401).json({message: "Invalid password"});
       }

       console.log("Login successful for", username);
       res.status(200).json({message: "Login successful", user: foundUser});
    }catch (error) {
       console.error("Login database error:", error);
       res.status(500).json({message: "Failed to login", err: error});
    }
};
        

module.exports= {register, login};