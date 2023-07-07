const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  barberId: {
    type: mongoose.Types.ObjectId,
    ref: "barbers",
  },
  rating: {
    type: Number,
    default: 3,
  },
  comment: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.Schema("review", ReviewSchema);
