const {updateName, displayUser, postUsers, deleteUser,displayUserBasedEmail}=require("./store/UserStorage");
console.log("before post users: ",displayUser());

postUsers({name:"ravi",email:"ravi@gmail.com"});
postUsers({name:"sai",email:"sai@gmail.com"});
postUsers({name:"raju",email:"raju@mail"})

console.log( "after post user Details",displayUser());

deleteUser("sai");//calling to delete user based on name
console.log("after delete User :", displayUser());

console.log("Email : ravi@gmail.com" ,displayUserBasedEmail('ravi@gmail.com'));
updateName("Ravi Kumar","ravi54678@gmail.com")//calling update name based on email