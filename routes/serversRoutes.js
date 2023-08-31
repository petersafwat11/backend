const express = require("express");

const serversController = require("../controllers/serversController");
const authController = require("../controllers/authController");

const router = express.Router();
router.use(
  authController.protect,
  authController.restrictTo("Manager", "Moderator", "Admin")
);
router.route("/").post(serversController.createServers);

router
  .route("/:id")
  .patch(serversController.updateServers)
  .get(serversController.getServers)
  .delete(serversController.deleteServers);

module.exports = router;
