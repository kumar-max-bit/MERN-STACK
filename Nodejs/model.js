function display() {
  console.log("This is display function");
}
//test to return userDetails
const test = () => {
  const userDetails = {
    name: "Sai",
    email: "admin@gmail.com",
    phone: 950124521,
  };
  return userDetails;
};
const name="Ravi";
module.exports={display,test, name} //exporting variables and functions