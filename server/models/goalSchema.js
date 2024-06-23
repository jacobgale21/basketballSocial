const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  time: { type: String, required: true },
  description: { type: String, required: true },
  // userID: {
  //   type: String,
  //   required: true,
  // },
});

const Goal = mongoose.model("Goals", goalSchema);

module.exports = Goal;
