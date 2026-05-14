const mongoose=require('mongoose');
const connection=async()=>{
   await mongoose.connect("mongodb://localhost:27017/bits")
    console.log("DB connected successfully");
}
    

module.exports=connection;


