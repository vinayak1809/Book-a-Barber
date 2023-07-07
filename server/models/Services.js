const mongoose = require("mongoose");
const { Schema } = mongoose;

const ServicesSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 25,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
    trim: true,
  },
  duration: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.Schema("Services", ServicesSchema);
