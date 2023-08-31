// const  = require("../models/channelsModel");
const Follower = require("../models/followersModel");
const GiveawayEvent = require("../models/giveawayEventModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getAllFollowers = factory.getAll(Follower);
exports.createFollower = factory.createOne(Follower);
exports.deleteFollowers = factory.deleteMany(Follower);
exports.createGiveawayPrize= factory.createOne(GiveawayEvent)
exports.updateGiveawayPrize= factory.updateOne(GiveawayEvent)
exports.generateWinner = catchAsync(async (req, res, next) => {
  const randomUser = await Follower.aggregate([{ $sample: { size: 1 } }]);
  res.status(201).json({
    status: "success",
    data: {
      data: randomUser[0],
    },
  });
});
// exports.deleteChannel = factory.deleteOne(Channels);
// exports.updateChannel = factory.updateOne(Channels);
// exports.getChannel = factory.getOne(Channels);
