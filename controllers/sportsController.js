const fsPromise = require("fs").promises;
// const fs = require("fs");
// const util = require("util");
// const path = require("path");
const multer = require("multer");

const Sport = require("../models/sportModel");
const factory = require("./handlerFactory");
const AppError = require("../utils/appError");
const ServersAndLangs = require("../models/serverAndLangsModel");
const catchAsync = require("../utils/catchAsync");

// const AppError = require("../utils/appError");

exports.getMatchByTeamNames = catchAsync(async (req, res) => {
  const { firstTeamName, secondTeamName } = req.query;
  const dateNow = new Date();
  const result = await Sport.findOne({
    firstTeamName: { $regex: firstTeamName.trim(), $options: "i" },
    secondTeamName: { $regex: secondTeamName.trim(), $options: "i" },
    // removeStream: { gt: dateNow },
  })
    .populate("servers")
    .exec();

  res.status(200).json({
    status: "success",
    data: {
      data: result,
    },
  });
});

exports.filterOldData = catchAsync(async (req, res, next) => {
  const dateNow = new Date();
  req.query.removeStream = { gt: dateNow };
  next();
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/matches/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.originalname.slice(
        0,
        file.originalname.lastIndexOf(".")
      )}-${Date.now()}.${file.originalname.slice(
        file.originalname.lastIndexOf(".") + 1
      )}`
    );
  },
});

const upload = multer({ storage: storage, fileFilter: multerFilter });
exports.uploadEventImages = upload.fields([
  { name: "backgroundLogo", maxCount: 1 },
  { name: "leagueLogo", maxCount: 1 },
  { name: "firstTeamLogo", maxCount: 1 },
  { name: "secondTeamLogo", maxCount: 1 },
  { name: "flagLogo", maxCount: 1 },
]);
exports.handleNewFiles = async (req, res, next) => {
  if (!req.files) {
    return next();
  }
  if (req.files.backgroundLogo) {
    req.body.backgroundLogo = req.files.backgroundLogo[0].filename;
  }
  if (req.files.leagueLogo) {
    req.body.leagueLogo = req.files.leagueLogo[0].filename;
  }
  if (req.files.firstTeamLogo) {
    req.body.firstTeamLogo = req.files.firstTeamLogo[0].filename;
  }
  if (req.files.secondTeamLogo) {
    req.body.secondTeamLogo = req.files.secondTeamLogo[0].filename;
  }
  if (req.files.flagLogo) {
    req.body.flagLogo = req.files.flagLogo[0].filename;
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(req.body)) {
    if (value === "null") {
      req.body[key] = null;
    }
  }
  next();
};
exports.handleEditedFiles = catchAsync(async (req, res, next) => {
  if (!req.files) {
    return next();
  }

  if (req.files.backgroundLogo) {
    req.body.backgroundLogo = req.files.backgroundLogo[0].filename;
  }
  if (req.files.leagueLogo) {
    req.body.leagueLogo = req.files.leagueLogo[0].filename;
  }
  if (req.files.firstTeamLogo) {
    req.body.firstTeamLogo = req.files.firstTeamLogo[0].filename;
  }
  if (req.files.secondTeamLogo) {
    req.body.secondTeamLogo = req.files.secondTeamLogo[0].filename;
  }
  if (req.files.flagLogo) {
    req.body.flagLogo = req.files.flagLogo[0].filename;
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(req.body)) {
    if (value === "null") {
      req.body[key] = null;
    }
  }
  const data = { ...req.body };
  delete data.servers;
  req.body = data;
  delete req.body.servers;

  next();
});
exports.deleteManyItemsRelatedData = async (req, res, next) => {
  try {
    const events = await Sport.find({ _id: { $in: req.body } });
    // Create an array of promises to delete all the images
    const promises = events.map((item) => {
      const { backgroundLogo, leagueLogo, firstTeamLogo, secondTeamLogo } =
        item;

      return [
        fsPromise.unlink(`public/img/matches/${backgroundLogo}`),
        fsPromise.unlink(`public/img/matches/${leagueLogo}`),
        fsPromise.unlink(`public/img/matches/${firstTeamLogo}`),
        fsPromise.unlink(`public/img/matches/${secondTeamLogo}`),
      ];
    });
    // Wait for all the promises to be resolved
    await Promise.all(promises);

    await ServersAndLangs.deleteMany({
      matchId: { $in: req.body },
    });
  } catch (err) {
    next(new AppError(err.message, 404));
  }

  next();
};

exports.deleteOneItemRelatedData = async (req, res, next) => {
  try {
    const deletedItem = await Sport.findById(req.params.id);
    // Create an array of promises to delete all the images
    const promises = (item) => {
      const { backgroundLogo, leagueLogo, firstTeamLogo, secondTeamLogo } =
        item;

      return [
        fsPromise.unlink(`public/img/matches/${backgroundLogo}`),
        fsPromise.unlink(`public/img/matches/${leagueLogo}`),
        fsPromise.unlink(`public/img/matches/${firstTeamLogo}`),
        fsPromise.unlink(`public/img/matches/${secondTeamLogo}`),
      ];
    };

    // Wait for all the promises to be resolved
    await Promise.all(promises(deletedItem));

    await ServersAndLangs.findOneAndDelete({
      matchId: req.params.id,
    });
  } catch (err) {
    next(new AppError(err.message, 404));
  }

  next();
};
exports.test = (req, res, next) => {
  console.dir(req.body);
  next();
};
exports.createSport = factory.createOne(Sport);
exports.deleteSports = factory.deleteMany(Sport);
exports.deleteSport = factory.deleteOne(Sport);
exports.updateSport = factory.updateOne(Sport);
exports.getSport = catchAsync(async (req, res, next) => {
  const eventData = await Sport.findById(req.params.id)
    .populate("servers")
    .exec();
  res.status(200).json({
    status: "success",
    data: eventData,
  });
});
// factory.getOne(Sport);
exports.getAllSports = factory.getAll(Sport);
