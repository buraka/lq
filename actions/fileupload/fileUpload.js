/**
 * Created by brk on 06.07.2014.
 */
var db = require('../../lib/fileupload/dbFile'),
    fileUploadInfo = require('../../models/baseResponse'),
    log = require('./../../log/logger'),
    errInfo = require('../../models/error'),
    fs = require('fs');

exports.upload = function (req, res) {
    /*fs.rename(req.files.myFile.path , process.cwd() + '/files/' + req.files.myFile.name, function (err) {
        if (err) {
            errInfo.ERROR(res, {
               msg: err.message
            });
        }
        log.logWarn('renamed complete -> '  + req.files.myFile.path);*/


    db.insertFile(req.files.myFile.path, req.files.myFile.name, true, 0, 0, true, req.body.email,function(doErr, file) {
        if (doErr){
            errInfo.ERROR(res, {
                msg:doErr.message
            })
        } else {
            fileUploadInfo.BASE_RESPONSE_INFO(res,
                {
                    msg: {
                        filePath: req.files.myFile.path,
                        fileName: req.files.myFile.name,
                        owner: file.owner
                    }
                })
        }
    /*});*/
    });


};
