const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.listen(4000);

app.use(express.static(path.join(__dirname, "/api/server/public")));
app.use(bodyParser.json());
app.use(cors());

dotenv.config();
