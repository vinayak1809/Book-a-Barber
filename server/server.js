const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const URI = "mongodb://localhost:27017/Book-a-barber";
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(4000);
    console.log("Database Connected!!");
  })
  .catch((err) => {
    if (err) throw err;
  });

app.use(cors());

dotenv.config();
