const Students=require('../model/StudentModel');
//add student
const addStudent=(req,res)=>{
  try{
     const{name,rollNo,branch,phone,email,address}=req.body;
   const newStudent={
    name:name,
    rollNo:rollNo,
    branch:branch,
    phone:phone,
    email:email,
    address:address,
   };

    Students.insertOne(newStudent)
    res.status(200).json({message:"Student added successfully"});

  }catch(e){
    res.status(500).json({message:"Error occurred while adding student"})
    console.log(err);
  }

};
//get all students
//get student by id
//update studentDetails
//delete student
//update only phone number

module.exports=addStudent;

