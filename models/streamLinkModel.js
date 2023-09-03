const mongoose = require("mongoose");

const streamLinkSchema = new mongoose.Schema({
  channelName: {
    type: String,
    required: [true, "please enter the channel name for this stream link!"],
  },
  URL: {
    type: String,
    required: [true, "please enter the url for this stream link!"],
  },
  // RMTPKey: {
  //   type: String,
  //   required: [true, "please enter the RMTPKey for this stream link!"],
  // },
});
const StreamLink = mongoose.model("StreamLink", streamLinkSchema);

module.exports = StreamLink;
