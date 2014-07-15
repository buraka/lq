/**
 * Created by burak.alparslan on 7/1/14.
 */
var db = require('../../lib/dbLogin')(),
    loginInfo = require('../../models/login/loginInfo'),
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
    var email = req.body.user,
        password = req.body.password,
        confrimPass = req.body.password,
        username = req.body.username;

    res.locals.session = req.session;
    if (password !== confrimPass) {
        res.jsonp({message: [{desc: "Passwords do not match", type: "error"}]});
    } else {
        db.createUser(email, password, username, function (doErr, response) {
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
    var email = req.body.user,
        password = req.body.password;

    res.locals.session = req.session;
    db.authenticateUser(email,password,function (doErr, response) {
        if (doErr){
            res.jsonp(errInfo.ERROR({
                'msg': doErr.message
            }));
        } else {
            req.session.authenticated = true;
            req.session.email = email;
            res.jsonp(loginInfo.LOGIN_INFO({
                msg : response.emailId
            }));
        }
    })
};

exports.logout = function (req, res) {
    res.locals.session = req.session;
    req.session.authenticated = false;
    req.session.email = '';
    res.jsonp(loginInfo.LOGIN_INFO({
        msg : [{desc: "You have been signed out.", type: "info"}]
    }));
};

