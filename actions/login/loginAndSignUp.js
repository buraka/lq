/**
 * Created by burak.alparslan on 7/1/14.
 */
var db = require('../../lib/login/dbLogin'),
    baseResponse = require('../../models/baseResponse'),
    errInfo = require('../../models/error');

exports.init = function (config) {
    db.configure(config.mongo);
};

// Authentication middleware
exports.auth = function (req, res, next) {
    if (req.session.authenticated) {
        next();
    } else {
        res.jsonp({
            err: 'not auth'
        });
    }
};

exports.signup = function (req, res) {
    var email = req.body.email,
        password = req.body.password,
        confrimPass = req.body.password,
        msg = req.body.msg,
        blocked = req.body.blocked,
        username = req.body.username;

    res.header("Access-Control-Allow-Origin", "*");
    res.locals.session = req.session;
    if (password !== confrimPass) {
        res.jsonp({message: [{desc: "Passwords do not match", type: "error"}]});
    } else {
        db.createUser(email, password, username, msg, blocked, function (doErr, response) {
            if (doErr){
                res.jsonp({
                    'msg': doErr.message
                });
            } else {
                res.jsonp({
                    'msg': response.msg
                });
            }
        });
    }
};

exports.doLogin = function (req, res) {
    var email = req.body.email,
        password = req.body.password;

    res.header("Access-Control-Allow-Origin", "*");
    res.locals.session = req.session;
    db.authenticateUser(email,password,function (doErr, user) {
        if (doErr){
            errInfo.ERROR(res, {
                'msg': doErr.message
            });
        } else {
            req.session.authenticated = true;
            req.session.email = user.emailId;
            baseResponse.BASE_RESPONSE_INFO(res, {
                msg : user.emailId
            });
        }
    })
};

exports.logout = function (req, res) {
    res.locals.session = req.session;
    req.session.authenticated = false;
    req.session.email = '';
    baseResponse.BASE_RESPONSE_INFO(res, {
        msg : [{desc: "You have been signed out.", type: "info"}]
    });
};

exports.updateUserName = function (req, res) {
    var email = req.body.email,
        userName = req.body.userName;

    db.updateUserName(email, userName, function (err) {
        if (err)
            errInfo.ERROR(res, {
                'msg': doErr.message
            });
        else
            baseResponse.BASE_RESPONSE_INFO(res, {
                msg : [{desc: "updated username", type: "info"}]
            })

    })
};

exports.getUserDetail = function (req, res) {
    db.getUserDetail(req.session.email, function (err, user) {
       if (err) {
           errInfo.ERROR(res, {
               msg: "An error occured."
           })
       } else {
           baseResponse.BASE_RESPONSE_INFO(res, {
               msg: user.id
           })
       }
    });
};

