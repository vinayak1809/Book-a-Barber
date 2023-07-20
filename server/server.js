const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//
app.use(require("./routes/userRoutes"));
app.use(require("./routes/barberRoutes"));
app.use(require("./routes/servicesRoutes"));
app.use(require("./routes/appointmentRoutes"));

dotenv.config();

const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/Book-a-barber";
mongoose
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

app.listen(4000);
