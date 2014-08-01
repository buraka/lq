/**
 * Created by burak.alparslan on 7/1/14.
 */
var mongoose = require('mongoose'),
    crypto = require('crypto'),
    log = require("./../../log/logger"),
    dbSchema = require('./../../schemas/dbSchemas');

var USER_COLLECTION = 'user',
    salt = 'supersecretkey';

function encryptPassword(password) {
    return crypto.createHmac('sha1', salt).update(password).digest('hex');
}

exports.createUser = function (reqEmailId, reqPassword, reqUserName, reqMsg, reqBlocked, callback) {
    var UserModel = mongoose.model(USER_COLLECTION, dbSchema.USER_SCHEMA);

    UserModel.count({emailId: reqEmailId }, function (err, c) {
        if(c > 0){
            log.logWarn("Count is " + c);
            callback(new Error(reqEmailId + " already exists"));

        } else {
            var user = new UserModel({
                emailId: reqEmailId,
                password: encryptPassword(reqPassword),
                userName: reqUserName,
                msg: reqMsg,
                blocked: reqBlocked
            });
            user.save(function (err) {
                if (err) {
                    log.logError(err);
                    callback(new Error(err));
                } else {
                    callback(null, {msg:"User created"});
                }
            });
        }
    });
};

exports.authenticateUser = function (reqEmailId, reqPassword, callback) {
    var UserModel = mongoose.model(USER_COLLECTION, dbSchema.USER_SCHEMA);

    var user = UserModel.findOne({emailId : reqEmailId, password: encryptPassword(reqPassword)}, function (err, user) {
        if (err) {
            log.logWarn("error authenticating user: " + err);
            callback(new Error(err));
        } else if(user) {
            callback(null, user);
        } else {
            log.logWarn("emailid/password did not match");
            callback(new Error("emailid/password did not match"));
        }
    });
};

exports.updateUserName = function (reqEmailId, reqUserName, callback) {
    var conditions = {emailId: reqEmailId},
        update = { userName:reqUserName},
        options = { multi:false};

    var UserModel = mongoose.model(USER_COLLECTION, dbSchema.USER_SCHEMA);

    UserModel.update(conditions,update, options, function (err) {
        if (err)
            log.logError(err);
        callback(err);
    });
};

exports.getUserDetail = function (reqEmail, callback) {
    var UserModel = mongoose.model(USER_COLLECTION, dbSchema.USER_SCHEMA);

    var user = UserModel.findOne({emailId : reqEmail}, function (err, user) {
        if (err) {
            log.logWarn("error authenticating user: " + err);
            callback(new Error(err));
        } else if(user) {
            callback(null, user);
        } else {
            log.logWarn("emailid/password did not match");
            callback(new Error("emailid/password did not match"));
        }
    });

};

exports.getUserDetailByID = function (reqId, callback) {
    var UserModel = mongoose.model(USER_COLLECTION, dbSchema.USER_SCHEMA);

    var user = UserModel.findOne({id : reqId}, function (err, user) {
        if (err) {
            log.logWarn("error finding user: " + err);
            callback(new Error(err));
        } else if(user) {
            callback(null, user);
        }
    });

};