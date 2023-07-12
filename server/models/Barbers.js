const mongoose = require("mongoose");
const { Schema } = mongoose;

const BarbersSchema = new Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
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
    maxlength: 500,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    maxlength: 25,
    trim: true,
  },
  ServicesOffered: [
    {
      type: String,
    },
  ],
  ratings: {
    type: String,
  },
  Schedules: {
    type: Date,
  },
});

module.exports = mongoose.model("barbers", BarbersSchema);

//BarbersSchema.add({
//  userID: {
//    type: mongoose.Types.ObjectId,
//    ref: "user",
//  },
//});
