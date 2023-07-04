const mongoose = require("mongoose");

const { Schema } = new mongoose();

const BarbersSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 25,
    trim: true,
  },
  logo: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
  },
  contactInformation: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    required: true,
    maxlength: 25,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    maxlength: 25,
    trim: true,
  },
  ServicesOffered: {
    type: String,
  },
  ratings: {
    type: String,
  },
  Schedules: {
    type: Date,
  },
});

module.exports = mongoose.Schema("barbers", BarbersSchema);
