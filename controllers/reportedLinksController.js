const ReportedLink = require("../models/reportedLinkModel");
const factory = require("./handlerFactory");

exports.getAllReportedLinks = factory.getAll(ReportedLink);
exports.createReportedLink = factory.createOne(ReportedLink);
exports.getReportedLink = factory.getOne(ReportedLink);

// Do NOT update passwords with this!
