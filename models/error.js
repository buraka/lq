/**
 * Created by brk on 04.07.2014.
 */
var log = require('./../log/logger');

exports.ERROR = function (res, json) {
    var response = {
        success: json.success ? json.success : false,
        msg: json.msg ? json.msg : ''
    };

    log.logWarn(response);
    res.jsonp(response);
};
