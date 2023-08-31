const mongoose = require("mongoose");

const channelsSchema = new mongoose.Schema({
  channelName: {
    type: String,
    required: [true, "please enter the name for this channel!"],
  },
  mode: {
    type: String,
    required: [true, "please chose the mode for this channel!"],
  },
  streamLinkName: {
    type: String,
    required: [true, "please enter the stream link name for this channel!"],
  },
});
const Channels = mongoose.model("Channels", channelsSchema);

module.exports = Channels;
