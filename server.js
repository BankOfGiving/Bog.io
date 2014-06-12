// Components
var express = require('express');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var compression = require('compression');
var morgan  = require('morgan');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var session = require('express-session');

var http = require('http');
var passport = require('passport');
var mongoose = require('mongoose');
var domain = require('domain');
var expressValidator = require('express-validator');
var path = require('path');

//var csrf = require('csurf');
//var favicon = require('serve-favicon');

// Configs
var config_db = require('./secrets/db.mongo');
var config_host = require('./secrets/env.host');
var sessionStore = require('./secrets/db.sessionStore');
var MongoStore = require('connect-mongo')(express);

mongoose.connect(config_db.connectionString);
mongoose.connection.on('error', function () {
    console.error('✗ Mongo Connection Error. Please make sure Mongo is running.');
});

var app = express();
var hour = 3600000;
var day = (hour * 24);
var week = (day * 7);
var month = (day * 30);

/** Passport Settings **/
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

/** Express Settings */
app.set('port', config_host.port || 5000);
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compression());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(expressValidator());
app.use(methodOverride());

//app.use(favicon());
//app.use(csrf());
app.use(session({
    secret: sessionStore.secret,
    maxAge: sessionStore.maxAge,
    store: new MongoStore({
        db: mongoose.connection.db,
        auto_reconnect: true
    })
}));
app.use(flash());
if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
}

/** Routes */
require('./server/apps/app.routes')(app, express);

/** Server Action */
var server = http.createServer(app).listen(app.get('port'), function () {
    console.log('ENV: ' + process.env.NODE_ENV);
    console.log('WWW: ' + config_host.protocol + ':' + config_host.uri + ((config_host.port != 80) ? ':' + config_host.port : ''));
    console.log('DB: ' + config_db.connectionString);
    console.log("Express server listening on port " + app.get('port') + " in " + app.settings.env);
});

/** Server Error Handling **/

server.on('request', function (req, res) {
    var error_handler_domain = domain.create();
    error_handler_domain.add(req);
    error_handler_domain.add(res);
    error_handler_domain.on('error', function (err) {
        console.log(err.message);
    });
});