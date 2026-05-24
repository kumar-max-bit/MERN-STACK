const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");
const connection = () => {
  mongoose
    .connect(process.env.MONGODB_URL, { family: 4 })
    .then(() => {
      console.log("DataBase Connected Successfully");
    })
    .catch((err) => {
      console.log("failed to connect DB:", err);
    });
};

module.exports = connection;
