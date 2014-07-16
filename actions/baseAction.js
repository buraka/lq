/**
 * Created by brk on 13.07.2014.
 */

var db = require('../lib/baseDB');

module.exports.init = function (config) {
    db.configure(config.mongo);
};
