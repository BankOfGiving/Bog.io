// Components
var express = require('express'),
    http = require('http'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    domain = require('domain');

// Configs
var sessionStore = require('./server/config/db.sessionStore');

var db = require('./server/config/db.mongo');
var host = require('./server/config/env.host');

// Bootstrap db connection
mongoose.connect(db.connectionString);

var MongoStore = require('connect-mongostore')(express);

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
//app.use(express.bodyParser());
app.use(express.session({
        secret: sessionStore.secret,
        maxAge: sessionStore.maxAge,
        store: new MongoStore(sessionStore.db)
    }, function (err) {
        console.log(err)
    }
));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

// Load Routes
require('./server/apps/app.routes')(app, express);

var server = http.createServer(app).listen(app.get('port'), function () {

    console.log('ENV: ' + process.env.NODE_ENV);
    console.log('WWW: ' + host.protocol + ':' + host.uri + ((host.port != 80) ? ':' + host.port : ''));
    console.log('DB: ' + db.connectionString);
    console.log("Express server listening on port " + app.get('port') + " in " + app.settings.env);
});

server.on('request', function (req, res) {
    var error_handler_domain = domain.create();
    error_handler_domain.add(req);
    error_handler_domain.add(res);
    error_handler_domain.on('error', function (err) {
        console.log(err.message);
    });
});