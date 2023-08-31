const ContactUs = require("../models/contactUsModel");
const factory = require("./handlerFactory");

exports.getAllContacts = factory.getAll(ContactUs);
exports.createContact = factory.createOne(ContactUs);
exports.deleteContact = factory.deleteOne(ContactUs);
exports.updateContact = factory.updateOne(ContactUs);

// Do NOT update passwords with this!
