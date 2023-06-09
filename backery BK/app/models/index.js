const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.Foods = require("./products.model.js")(mongoose);
db.Phones = require("./phone.js")(mongoose);
module.exports = db;
