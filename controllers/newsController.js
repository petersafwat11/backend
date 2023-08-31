
const News = require("../models/newsModel");
const factory = require("./handlerFactory");

exports.getAllnews = factory.getAll(News);
exports.getNewsItem = factory.getOne(News);
exports.createNews = factory.createOne(News);

