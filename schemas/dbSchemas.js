/**
 * Created by burak.alparslan on 7/4/14.
 */

var mongoose = require('mongoose');

exports.USER_SCHEMA = new mongoose.Schema({
    emailId: String,
    password: String,
    userName: String
});
