const express = require("express");

const channelsController = require("../controllers/channelsController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(channelsController.getAllChannels)
  .post(
    authController.protect,
    authController.restrictTo("Manager", "Moderator", "Admin"),
    channelsController.createChannel
  )
  .delete(
    authController.protect,
    authController.restrictTo("Manager", "Moderator", "Admin"),
    channelsController.deleteChannels
  );

router
  .route("/:id")
  .patch(
    authController.protect,
    authController.restrictTo("Manager", "Moderator", "Admin"),
    channelsController.updateChannel
  )
  .get(channelsController.getChannel)
  .delete(
    authController.protect,
    authController.restrictTo("Manager", "Moderator", "Admin"),
    channelsController.deleteChannel
  );

module.exports = router;
