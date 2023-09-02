const mongoose = require("mongoose");
const { Schema } = mongoose;

const SchedulesSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  barberId: {
    type: mongoose.Types.ObjectId,
    ref: "barbers",
    required: true,
  },
  dayTime: [
    {
      date: {
        type: String,
      },
      time: [
        {
          time: { type: String },
          isBooked: { type: Boolean },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Schedules", SchedulesSchema);
