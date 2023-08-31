
const StreamLink = require("../models/streamLinkModel");
const factory = require("./handlerFactory");

exports.getAllStreamLinks = factory.getAll(StreamLink);
exports.createstreamLink = factory.createOne(StreamLink);
exports.deleteStreamLinks = factory.deleteMany(StreamLink);
exports.deleteStreamLink = factory.deleteOne(StreamLink);
exports.updateStreamLink = factory.updateOne(StreamLink);
exports.getStreamLink = factory.getOne(StreamLink);

// Do NOT update passwords with this!
