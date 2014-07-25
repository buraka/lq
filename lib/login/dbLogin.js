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
            console.log("Count is " + c);
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
                    console.log(err);
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
            console.log("error authenticating user: " + err);
            callback(new Error(err));
        } else if(user) {
            callback(null, user);
        } else {
            console.log("emailid/password did not match");
            callback(new Error("emailid/password did not match"));
        }
    });
};



