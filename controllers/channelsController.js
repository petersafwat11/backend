const Channels = require("../models/channelsModel");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getAllChannels =
  //  factory.getAll(Channels);

  catchAsync(async (req, res, next) => {
    // let filter = {};
    // if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Channels.find(), req.query)
      .sort()
      .filter()
      .paginate();
    const filtered = new APIFeatures(Channels.find(), req.query).filter();
    const featuresChannels = await features.query;
    const filteredChannels = await filtered.query;
    const allLanguages = [
      ...new Set(filteredChannels.map((channel) => channel.language)),
    ];

    res.status(200).json({
      status: "success",
      results: filteredChannels.length,
      allLanguages,
      data: {
        data: featuresChannels,
      },
    });
  });

exports.createChannel = factory.createOne(Channels);
exports.deleteChannels = factory.deleteMany(Channels);
exports.deleteChannel = factory.deleteOne(Channels);
exports.updateChannel = factory.updateOne(Channels);
exports.getChannel = factory.getOne(Channels);

// Do NOT update passwords with this!
