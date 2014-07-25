/**
 * Created by burak.alparslan on 7/4/14.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var USER = new Schema({
    emailId: {type: String, required: true},
    password: {type: String, required: true},
    userName: {type: String, required: true},
    msg: {type: String},
    blocked: {type: Boolean}
});

var COMMENT = new Schema({
   owner: {type: Schema.ObjectId, ref: 'USER'},
   comment: {type: String, required: true}
});

var FILE = new Schema({
   fileName: {type: String, required: true},
   filePath: {type: String, required: true},
   visibility: {type: Boolean, required: true},
   priority: {type: Number},
   numberOfSees: {type: Number},
   likes: [{type: Schema.ObjectId, ref: 'USER'}],
   comments: {type: Schema.ObjectId, ref: 'COMMENT'},
   isActive: {type: Boolean},
    owner: {type: Schema.ObjectId, ref: 'USER'}
});

var PROFILE = new Schema({
    name: {type: String},
    surname: {type: String},
    age: {type: String},
    status: {type: String},
    country: {type: String},
    city: {type: String},
    address: {type: String},
    photo: {type: Schema.ObjectId, ref: 'FILE'},
    user: {type: Schema.ObjectId, ref: 'USER'}
});

exports.USER_SCHEMA = USER;
exports.COMMENT_SCHEMA = COMMENT;
exports.FILE_SCHEMA = FILE;
exports.PROFILE_SCHEMA = PROFILE;