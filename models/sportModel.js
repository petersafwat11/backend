const mongoose = require("mongoose");

const sportSchema = new mongoose.Schema({
  flagged: {
    type: Boolean,
    default: false,
  },
  sportCategory: {
    type: String,
    lowercase: true,
    required: [true, "please enter the sports category"],
  },
  firstTeamName: {
    type: String,
    required: [true, "please enter the first team name"],
  },
  secondTeamName: {
    type: String,
    required: [true, "please enter the second team name"],
  },
  eventDate: {
    type: Date,
    required: [true, "please enter the date of the event"],
  },
  matchId: {
    type: Number,
    // required: [true, "please enter the id of the event"],
  },
  eventLeague: {
    type: String,
    required: [true, "please enter the league of the event"],
  },
  eventStadium: {
    type: String,
    required: [true, "please enter the stadium of the event"],
  },
  backgroundLogo: {
    type: String,
    // required: [true, "please enter the background of the event"],
  },
  leagueLogo: {
    type: String,
    // required: [true, "please enter the league of the event"],
  },
  firstTeamLogo: {
    type: String,
    // required: [true, "please enter the logo of the first team"],
  },
  secondTeamLogo: {
    type: String,
    // required: [true, "please enter the logo of the second team"],
  },
  playStream: {
    type: Date,
    required: [true, "please enter the date when the streams begins"],
  },
  removeStream: {
    type: Date,
    required: [true, "please enter the date for removing the streams"],
  },
  removeCountdown: {
    type: Date,
    required: [true, "please enter the date for removing the countdown"],
  },
  showsPoll: { type: Boolean, default: false },
  firstTeamPoll: String,
  secondTeamPoll: String,
  servers: [{ type: mongoose.Schema.Types.ObjectId, ref: "ServerAndLangs" }],
});

const Sport = mongoose.model("Sport", sportSchema);

module.exports = Sport;
