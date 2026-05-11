const http = require("http");
const Buffer =require("buffer");

const port = 5000;
const userDetails = {
  name: "Admin",
  email: "admin@gmail.com",
  password: "admin@123",
};



//server creation
const server = http.createServer((req, res) => {
  res.end(JSON.stringify(userDetails));
});


server.listen(port, () => {
  console.log("Server running on port :", port);
});