const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
<<<<<<< Updated upstream
const mongoose = require("mongoose");
const app = express();

app.listen(4000);

app.use(express.static(path.join(__dirname, "/api/server/public")));
app.use(bodyParser.json());
app.use(cors());

dotenv.config();
=======
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//
app.use(require("./routes/userRoutes"));

//dotenv.config();

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
>>>>>>> Stashed changes
