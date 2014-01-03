// Components
var express = require('express'),
    http = require('http'),
    path = require('path'),
    passport = require('passport'),
    mongoose = require('mongoose');
// Configs
var sessionStore = require('./server/config/db.sessionStore');

var db = require('./server/config/db.mongo');
// Bootstrap db connection
mongoose.connect(db.connectionString);

var MongoStore = require('connect-mongostore')(express);

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
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
app.use('/', express.static(path.join(__dirname, 'client/apps/pub')));
app.use('/admin', express.static(path.join(__dirname, 'client/apps/admin')));
app.use('/dash', express.static(path.join(__dirname, 'client/apps/dash')));
app.use('/js/lib/npm/', express.static(path.join(__dirname, '/node_modules'))); // for development only.  Remove with build!
app.use('/js/lib/b/', express.static(path.join(__dirname, '/bower_components')));  // for development only.  Remove with build!

// Routes
require('./server/apps/app.routes')(app);

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port') + " in " + app.settings.env);
});
