/**
 * Created by brk on 04.07.2014.
 */
var log = require('./../../log/logger');

exports.LOGIN_INFO = function (json) {
    var response = {
        success: json.success ? json.success : true,
        msg: json.msg ? json.msg : ''
    };

    log.logWarn(response);
    return response
};
