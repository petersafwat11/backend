const Channels = require("../models/channelsModel");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getChannelByName = catchAsync(async (req, res) => {
  const { channelName } = req.query;
  const result = await Channels.findOne({
    channelName: { $regex: channelName, $options: "i" },
    mode: "Visible",
  });
  delete req.query.channelName;
  const filtered = new APIFeatures(Channels.find(), req.query).filter();
  const filteredChannels = await filtered.query;
  const allLanguages = [
    ...new Set(filteredChannels.map((channel) => channel.language)),
  ];

  res.status(200).json({
    status: "success",
    allLanguages,
    data: {
      data: result,
    },
  });
});

exports.getAllChannels =
  //  factory.getAll(Channels);

  catchAsync(async (req, res, next) => {
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
