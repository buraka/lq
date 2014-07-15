/**
 * Created by burak.alparslan on 7/1/14.
 */

var winston = require('winston'),logger;

var log = {
    'logger' : {
        'levels': {
            'detail': 0,
            'trace': 1,
            'debug': 2,
            'enter': 3,
            'info': 4,
            'warn': 5,
            'error': 6
        },
        'colors': {
            'detail': 'grey',
            'trace': 'white',
            'debug': 'blue',
            'enter': 'inverse',
            'info': 'green',
            'warn': 'yellow',
            'error': 'red'
        }
    }
};

    logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({ json: false, timestamp: true }),
            new winston.transports.File({ filename: __dirname + '/logs/debug.log', json: false })
        ],
        exceptionHandlers: [
            new (winston.transports.Console)({ json: false, timestamp: true }),
            new winston.transports.File({ filename: __dirname + '/logs/exceptions.log', json: false })
        ],
        exitOnError: false
    });

    logger.setLevels(log.logger.levels);
    winston.addColors(log.logger.colors);



exports.getlogger = function () {
  return logger;
};

exports.logWarn = function (info) {
  logger.info(info);
};

exports.logError = function (err) {
    logger.error(err);
};