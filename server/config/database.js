const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/Book-a-barber";
//const URI = process.env.MONGODB_URI;
//console.log("URi", URI);

const connection = mongoose
  .connect(URI)
  .then(() => {
    console.log("Database Connected!!");
  })
  .catch((err) => {
    if (err) throw err;
  });

module.exports = { connection };
