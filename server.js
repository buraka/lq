/**
 * Created by burak.alparslan on 6/30/14.
 */
var express = require('express'),
    services = require('./actions/services'),
    login = require('./actions/login/loginAndSignUp'),
    fileUpload = require('./actions/fileupload/fileUpload'),
    store = new express.session.MemoryStore,
    log = require("./log/logger"),
    busboy = require('connect-busboy'),
    baseDB = require("./lib/baseDB"),
    fs = require('fs');

var app = express();

/* Configuration */
try {
    var configJSON = fs.readFileSync(__dirname + "/config.json");
    var config = JSON.parse(configJSON.toString());
} catch(e) {
    log.logError("File config.json not found or is invalid: " + e.message);
    process.exit(1);
}
/*login.init(config);*/
baseDB.configure(config.mongo);


app.use(express.bodyParser({
    keepExtensions: true,
    uploadDir: __dirname + '/files',
    limit: '500mb'
}));
app.use(express.cookieParser());
app.use(express.session({ secret: 'whatever', store: store }));


app.use(busboy());


/* Action declerations */
//stateless actions
app.post('/createUser', login.signup);
app.post('/doLogin', login.doLogin);
app.get('/logout', login.logout);
app.get('/test', function (req, res) {
    log.logWarn("Its here!!!\n");

    res.jsonp({
        msg : "test"
    });
});
app.post('/test', function (req, res) {
    log.logWarn("Its here!!!\n");
    res.header("Access-Control-Allow-Origin", "*");
    res.jsonp({
        msg : "test"
    });
});

//restrict actions
app.post('/fileupload',login.auth , fileUpload.upload);
app.post('/updateUserName', login.auth, login.updateUserName);
app.get('/getUserDetail', login.auth, login.getUserDetail);

/*
app.get('/employees/:id/reports', services.findByManager);
app.get('/employees/:id', services.findById);
app.get('/employees', login.auth, services.findAll);
*/

app.listen(3000);
console.log('Listening on port 3000...');
log.logWarn('Listening on port 3000...');