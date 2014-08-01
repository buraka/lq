/**
 * Created by brk on 13.07.2014.
 */

var mongoose = require('mongoose'),
    log = require("./../../log/logger"),
    dbLogin = require("../login/dbLogin"),
    dbSchema = require('./../../schemas/dbSchemas');

var FILE_COLLECTION = 'file';

exports.insertFile = function (reqFilePath, reqFileName, reqVisibility, reqPrioriy, reqNumberOfSeen, reqIsActive, reqOwner, callback) {

    var owner = null;
    dbLogin.getUserDetail(reqOwner, function (err, user) {
       if (err){
           log.logError(err);
           callback(new Error(err));
           return -1;
       } else {
           owner = user;
           var FileModel = mongoose.model(FILE_COLLECTION, dbSchema.FILE_SCHEMA);

           var file = new FileModel({
               fileName: reqFileName,
               filePath: reqFilePath,
               visibility: reqVisibility,
               priority: reqPrioriy,
               numberOfSeen: reqNumberOfSeen,
               likes: {},
               //comments: reqComments,
               isActive: reqIsActive,
               owner: owner
           });
           file.save(function (err, file) {
               if (err) {
                   log.logError(err);
                   callback(new Error(err));
               } else {
                   callback(null, file);
               }
           });
       }
    });



};