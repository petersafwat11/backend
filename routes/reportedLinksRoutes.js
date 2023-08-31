const express = require("express");

const reportedLinksController = require("../controllers/reportedLinksController");

const router = express.Router();

router
  .route("/")
  .get(reportedLinksController.getAllReportedLinks)
  .post(reportedLinksController.createReportedLink);

router.route("/:id").get(reportedLinksController.getReportedLink);

module.exports = router;
