// Components
var express = require('express'),
    flash = require('express-flash'),
    http = require('http'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    domain = require('domain'),
    expressValidator = require('express-validator'),
    path = require('path');

// Configs
var sessionStore = require('./secrets/db.sessionStore'),
    db = require('./secrets/db.mongo'),
    host = require('./secrets/env.host'),
    MongoStore = require('connect-mongo')(express);

mongoose.connect(db.connectionString);
mongoose.connection.on('error', function () {
    console.error('✗ MongoDB Connection Error. Please make sure MongoDB is running.');
});

var app = express();
var hour = 3600000;
var day = (hour * 24);
var week = (day * 7);
var month = (day * 30);

/** Express Settings */
app.set('port', process.env.PORT || 5000);
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.compress());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(expressValidator());
app.use(express.methodOverride());
app.use(express.session({
    secret: sessionStore.secret,
    maxAge: sessionStore.maxAge,
    store: new MongoStore({
        db: mongoose.connection.db,
        auto_reconnect: true
    })
}));
// app.use(express.csrf());
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

app.use(flash());
app.use(app.router);
app.use(express.errorHandler());

/** Routes */

require('./server/apps/app.routes')(app, express);

/** Server Action */

var server = http.createServer(app).listen(app.get('port'), function () {
    console.log('ENV: ' + process.env.NODE_ENV);
    console.log('WWW: ' + host.protocol + ':' + host.uri + ((host.port != 80) ? ':' + host.port : ''));
    console.log('DB: ' + db.connectionString);
    console.log("Express server listening on port " + app.get('port') + " in " + app.settings.env);
});

/** Server Error Handling */
server.on('request', function (req, res) {
    var error_handler_domain = domain.create();
    error_handler_domain.add(req);
    error_handler_domain.add(res);
    error_handler_domain.on('error', function (err) {
        console.log(err.message);
    });
});