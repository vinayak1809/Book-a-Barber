const mongoose = require("mongoose");
const { Schema } = mongoose;

const BarbersSchema = new Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
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
// for above situation what i am considering is: i will create a field where publish {true/false} if wants to publish he can / he can the info to the draft but before publishing it barber have to enter every info to the database
//BarbersSchema.add({
//  userID: {
//    type: mongoose.Types.ObjectId,
//    ref: "user",
//  },
//});
