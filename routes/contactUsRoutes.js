const express = require("express");

const contactUsController= require('../controllers/contactUsController')

const router = express.Router();

router
  .route('/')
  .get(contactUsController.getAllContacts)
  .post(contactUsController.createContact);

  router.route("/:id").patch(contactUsController.updateContact);

module.exports = router;
