const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { connection } = require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

dotenv.config({ path: "./config.env" });

app.use(require("./routes/userRoutes"));
app.use(require("./routes/barberRoutes"));
app.use(require("./routes/servicesRoutes"));
app.use(require("./routes/appointmentRoutes"));

connection;

app.use(cookieParser());
app.get("/api/getKey", (req, res) =>
  res
    .status(200)
    .json({ RZP_key: process.env.RZP_KEY_ID, CLOUD_key: process.env.CLOUD_KEY })
);

app.listen(4000);
