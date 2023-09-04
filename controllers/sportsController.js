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

exports.getCurrentEvents = catchAsync(async (req, res, next) => {
  const { query } = req;
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete query[el]);
  const currentDate = new Date();
  console.log(query);
  const totalOtherMatches = await Sport.find({
    flagged: false,
  }).countDocuments();
  const currentEvents = await Sport.find({
    ...query,
    playStream: { $lt: currentDate },
    removeStream: { $gt: currentDate },
  });
  res.status(200).json({
    status: "success",
    data: currentEvents,
    totalOtherMatches: totalOtherMatches,
  });
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
    console.log(
      file.originalname.slice(file.originalname.lastIndexOf(".") + 1)
    );

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
exports.uploadTourImages = upload.fields([
  { name: "backgroundLogo", maxCount: 1 },
  { name: "leagueLogo", maxCount: 1 },
  { name: "firstTeamLogo", maxCount: 1 },
  { name: "secondTeamLogo", maxCount: 1 },
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
  next();
};
exports.handleEditedFiles = async (req, res, next) => {
  try {
    // const unlinkAsync = util.promisify(fs.unlink);
    if (!req.files) {
      return next();
    }

    const editedItem = await Sport.findById(req.params.id);
    // const filePath = (name) =>
    //   path.join(__dirname, "public", "img", "matches", name);

    if (!editedItem) {
      next(new AppError("there is no doc found with that id", 404));
    }
    // const { backgroundLogo, leagueLogo, firstTeamLogo, secondTeamLogo } =
    //   editedItem;

    if (req.files.backgroundLogo) {
      // const existedFile = await unlinkAsync(
      //   `public/img/matches/${secondTeamLogo}`
      // );
      // fs.access(filePath(backgroundLogo), fs.constants.F_OK);
      // console.log(`File '${filePath}' exists`);

      // if (existedFile) {
      //   await unlinkAsync(`public/img/matches/${backgroundLogo}`);
      // }
      req.body.backgroundLogo = req.files.backgroundLogo[0].filename;
    }
    if (req.files.leagueLogo) {
      // const existedFile = await fs.access(
      //   filePath(backgroundLogo),
      //   fs.constants.F_OK
      // );
      // console.log(`File '${filePath}' exists`);

      // if (existedFile) {
      //   await unlinkAsync(`public/img/matches/${leagueLogo}`);
      // }

      req.body.leagueLogo = req.files.leagueLogo[0].filename;
    }
    if (req.files.firstTeamLogo) {
      // const existedFile = await fs.access(
      //   filePath(backgroundLogo),
      //   fs.constants.F_OK
      // );
      // console.log(`File '${filePath}' exists`);

      // if (existedFile) {
      //   await unlinkAsync(`public/img/matches/${firstTeamLogo}`);
      // }

      req.body.firstTeamLogo = req.files.firstTeamLogo[0].filename;
    }
    if (req.files.secondTeamLogo) {
      // const existedFile = await fs.access(
      //   filePath(backgroundLogo),
      //   fs.constants.F_OK
      // );
      // console.log(`File '${filePath}' exists`);

      // if (existedFile) {
      //   await unlinkAsync(`public/img/matches/${secondTeamLogo}`);
      // }

      req.body.secondTeamLogo = req.files.secondTeamLogo[0].filename;
    }
    const data = { ...req.body };
    delete data.servers;
    req.body = data;
    next();
  } catch (error) {
    next(new AppError(error.message, error.statusCode));
  }
};
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

exports.createSport = factory.createOne(Sport);
exports.deleteSports = factory.deleteMany(Sport);
exports.deleteSport = factory.deleteOne(Sport);
exports.updateSport = factory.updateOne(Sport);
exports.getSport = catchAsync(async (req, res, next) => {
  const eventData = await Sport.findById(req.params.id)
    .populate("servers")
    .exec();
  console.log(eventData);
  res.status(200).json({
    status: "success",
    data: eventData,
  });
});
// factory.getOne(Sport);
exports.getAllSports = factory.getAll(Sport);
