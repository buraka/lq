/**
 * Created by brk on 06.07.2014.
 */
var db = require('../../lib/fileupload/dbFile'),
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
        db.insertFile(req.files.myFile.path,req.files.myFile.name,function(doErr, response) {
            fileUploadInfo.BASE_RESPONSE_INFO(res,
                    {
                        filePath: req.files.myFile.path,
                        fileName: req.files.myFile.name
                    })

        });
    });



};
