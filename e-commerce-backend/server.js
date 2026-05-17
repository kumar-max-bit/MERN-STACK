const express=require("express")
const cors=require("cors")
const app= express();
const env= require("dotenv")
const connection= require("./config/database")
const userRouter= require("./routes/userRouter")
const productRouter= require("./routes/productRouter")
env.config();
connection();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/products", productRouter);
const PORT= process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("Server is running on port:", PORT);
})