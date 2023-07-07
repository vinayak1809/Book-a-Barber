const express = require("express");
const router = express.Router();
import { registerUser } from "../controllers/userController";

router.route("/register").post(registerUser);
