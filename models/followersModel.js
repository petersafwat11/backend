const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "please enter your fullname!"],
  },
  email: {
    type: String,
    required: [true, "please enter your email!"],
  },
  method: {
    type: String,
    required: [true, "please enter the method!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const Follower = mongoose.model("Follower", followerSchema);

module.exports = Follower;
