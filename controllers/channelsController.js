const Channels = require("../models/channelsModel");
const factory = require("./handlerFactory");

exports.getAllChannels = factory.getAll(Channels);
exports.createChannel= factory.createOne(Channels);
exports.deleteChannels= factory.deleteMany(Channels);
exports.deleteChannel = factory.deleteOne(Channels);
exports.updateChannel = factory.updateOne(Channels);
exports.getChannel = factory.getOne(Channels);

// Do NOT update passwords with this!
