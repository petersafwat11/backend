const Newsletter = require("../models/newsletterModel");
const factory = require("./handlerFactory");

exports.getAllUsers = factory.getAll(Newsletter);
exports.addUser = factory.createOne(Newsletter);
exports.deleteUser = factory.deleteOne(Newsletter);

// Do NOT update passwords with this!
