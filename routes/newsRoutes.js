const express = require("express");

const newsController = require("../controllers/newsController");

const router = express.Router();

router.route("/").get(newsController.getAllnews);
// .post(
//   newsController.uploadTourImages,
//   newsController.handleNewFiles,
//   newsController.createSport
// )
// .delete(
//   newsController.deleteManyItemsRelatedData,
//   newsController.deleteSports
// );

router
  .route("/:id")
  // .patch(
  //   newsController.uploadTourImages,
  //   newsController.handleEditedFiles,
  //   newsController.updateSport
  // )
  .get(newsController.getNewsItem);
// .delete(
//   newsController.deleteOneItemRelatedData,
//   newsController.deleteSport
// );

module.exports = router;
