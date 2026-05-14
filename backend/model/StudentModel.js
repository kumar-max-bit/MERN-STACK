const mongoose=require("mongoose");

const studentSchema=new mongoose.Schema({
    name:{ type: String,required:true},
    rollNo:{ type: String,unique:true},
    branch:{ type: String,required:true},
    phone:{ type: String,unique:true,required:true,length:10},
    email:{ type: String,unique:true,required:true},
    address:{ type: String,required:true}
})


const studentModel=mongoose.model("Students",studentSchema);
module.exports=studentModel;