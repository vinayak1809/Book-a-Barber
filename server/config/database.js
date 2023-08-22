const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/Book-a-barber";

const connection = mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected!!");
  })
  .catch((err) => {
    if (err) throw err;
  });

module.exports = { connection };