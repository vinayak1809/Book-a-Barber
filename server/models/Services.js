const mongoose = require("mongoose");
const { Schema } = mongoose;

const ServicesSchema = new Schema({
  //barber's userID
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  salonID: {
    type: mongoose.Types.ObjectId,
    ref: "barbers",
  },
  tag: {
    type: String,
    required: true,
  },
  types: [
    {
      name: {
        type: String,
        required: true,
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
    },
  ],
  image: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
  },
  //  priceRange:{
  //    type:String,
  //  }
});

//ServicesSchema.add({
//  image: {
//    type: String,
//    default:
//      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
//  },
//});

module.exports = mongoose.model("services", ServicesSchema);
