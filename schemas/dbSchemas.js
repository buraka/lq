/**
 * Created by burak.alparslan on 7/4/14.
 */

var mongoose = require('mongoose');

var USER = new mongoose.Schema({
    emailId: {type: String, required: true},
    password: {type: String, required: true},
    userName: {type: String, required: true},
    msg: {type: String},
    blocked: {type: Boolean}
});

var COMMENT = new mongoose.Schema({
   owner: {type: USER, required: true},
   comment: {type: String, required: true}
});

var FILE = new mongoose.Schema({
   fileName: {type: String, required: true},
   filePath: {type: String, required: true},
   visibility: {type: Boolean, required: true},
   priority: {type: Number},
   numberOfSees: {type: Number},
   likes: {type: [USER]},
   comments: {type: [COMMENT]},
   isActive: {type: Boolean},
    owner: {type: USER, required: true}
});

var PROFILE = new mongoose.Schema({
    name: {type: String},
    surname: {type: String},
    age: {type: String},
    status: {type: String},
    country: {type: String},
    city: {type: String},
    address: {type: String},
    photo: {type: FILE},
    user: {type:USER, required: true}
});


exports.USER_SCHEMA = USER;
exports.COMMENT_SCHEMA = USER;
exports.FILE_SCHEMA = USER;
exports.PROFILE_SCHEMA = PROFILE;