const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { connection } = require("./config/database");
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

dotenv.config({ path: "./config.env" });

app.use(require("./routes/userRoutes"));
app.use(require("./routes/barberRoutes"));
app.use(require("./routes/servicesRoutes"));
app.use(require("./routes/appointmentRoutes"));

connection;

app.get("/api/getKey", (req, res) =>
  res.status(200).json({ key: process.env.RZP_KEY_ID })
);
app.listen(4000);
