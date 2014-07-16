/**
 * Created by brk on 13.07.2014.
 */

var mongoose = require('mongoose'),
    log = require("./../../log/logger"),
    db;

module.exports.configure = function (config) {
    db = mongoose.connect(config ? config : 'mongodb://localhost:27017/LQ');
    log.logWarn('DB Connection  successfully done.');
};