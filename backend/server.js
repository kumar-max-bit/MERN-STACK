const express = require('express');
// const cors = require('cors'); // Uncomment after running: npm install cors
const app = express();
const PORT = process.env.PORT || 5000;
const connection = require('./config/db');

// Middleware
// app.use(cors()); // Allow requests from frontend
app.use(express.json());

// Database Connection
connection(); 

const studentRouter=require("./routes/studentRouter");
app.use("/students", studentRouter);

app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`);
});