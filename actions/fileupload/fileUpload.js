/**
 * Created by brk on 06.07.2014.
 */
var db = require('../../lib/dbLogin')(),
    fileUploadInfo = require('../../models/baseResponse'),
    log = require('./../../log/logger'),
    errInfo = require('../../models/error'),
    fs = require('fs');

exports.upload = function (req, res) {
    fs.rename(req.files.myFile.path , process.cwd() + '/files/' + req.files.myFile.name, function (err) {
        if (err) {
            errInfo.ERROR({
               msg: err.message
            });
            throw err;
        }
        log.logWarn('renamed complete -> '  + req.files.myFile.path);
    });
    res.jsonp(fileUploadInfo.BASE_RESPONSE_INFO({
        msg :{
            filePath: req.files.myFile.path,
            fileName: req.files.myFile.name
        }
    }));
}