const express = require("express");

const feedbackController = require("../controllers/feedbackController");

const router = express.Router();

router
  .route("/")
  .get(feedbackController.getAllFeedback)
  .post(feedbackController.sendFeedback);
router.route("/:id").patch(feedbackController.updateFeedback);

module.exports = router;
