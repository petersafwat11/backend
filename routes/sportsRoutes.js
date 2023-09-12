const express = require("express");

const sportsController = require("../controllers/sportsController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/currentEvents").get(sportsController.getCurrentEvents);
router.route("/search").get(sportsController.getAllSports);
router
  .route("/")
  .get(sportsController.getAllSports)
  .post(
    // authController.protect,
    // authController.restrictTo("Manager", "Moderator", "Admin"),

    sportsController.uploadTourImages,
    sportsController.handleNewFiles,
    sportsController.createSport
  )
  .delete(
    // authController.protect,
    // authController.restrictTo("Manager", "Moderator", "Admin"),
    sportsController.deleteManyItemsRelatedData,
    sportsController.deleteSports
  );

router
  .route("/:id")
  .patch(
    // authController.protect,
    // authController.restrictTo("Manager", "Moderator", "Admin"),

    sportsController.uploadTourImages,
    sportsController.handleEditedFiles,
    sportsController.updateSport
  )
  .get(sportsController.getSport)
  .delete(
    // authController.protect,
    // authController.restrictTo("Manager", "Moderator", "Admin"),

    sportsController.deleteOneItemRelatedData,
    sportsController.deleteSport
  );

module.exports = router;
