const mongoose = require("mongoose");

const giveawayEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "a news article must have a title!"],
  },
  description: {
    type: String,
    required: [true, "please enter a breif description!"],
  },
  startTime: {
    type: Date,
    required: "please enter the start of the giveaway prize",
  },
  endTime: {
    type: Date,
    required: "please enter the end of the giveaway prize",
  },
  prizeImage: {
    type: String,
    required: "please upload a prize image",
  },
});
const GiveawayEvent = mongoose.model("GiveawayEvent", giveawayEventSchema);

module.exports = GiveawayEvent;
