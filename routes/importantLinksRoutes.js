const express = require("express");
const linksController = require("../controllers/importantLinksConteroller");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").get(linksController.getAllImportedLinks);
router
  .route("/:id")
  .patch(
    authController.protect,
    authController.restrictTo("Manager", "Moderator", "Admin"),
    linksController.updateImportedLinks
  );
// .post(linksController.createImportedLinks)

module.exports = router;
