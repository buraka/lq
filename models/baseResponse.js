/**
 * Created by brk on 06.07.2014.
 */
var log = require('./../log/logger');

exports.BASE_RESPONSE_INFO = function (res, json) {
    var response = {
        success: json.success ? json.success : true,
        msg: json.msg ? json.msg : ''
    };

    log.logWarn(response);
    res.jsonp(response);
};
