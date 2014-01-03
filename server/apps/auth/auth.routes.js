module.exports = function (app) {
//    var path = require('path');
//    var bogAuth = require('../../modules/bog.auth.js');
//
//    var uriBase = '/auth';
//
//    require('./routes/auth.routes.facebook.js')(app, uriBase);
//    require('./routes/auth.routes.google.js')(app, uriBase);
//    require('./routes/auth.routes.twitter.js')(app, uriBase);
//
//    app.get(uriBase + '/', function (req, res) {
//        res.render(path.join(__dirname, '../views/login'), {
//            title: 'Login',
//            stylesheet: 'login'})
//    });
//
//    app.get(uriBase + '/logout', bogAuth.ensureAuthenticated, function (req, res) {
//        req.logOut();
//        res.redirect('/');
//    });
//
//    app.get(uriBase + '/success', bogAuth.ensureAuthenticated, function (req, res) {
//        req.logIn(req.user, function (err) {
//            if (err) {
//                console.log("ERROR!!! PANIC!!!");
//                res.send(401);
//            }
//            res.render(path.join(__dirname, '/views/success'), {title: req.user.displayName, user: req.user});
//        });
//    });
//
//    app.get(uriBase + '/failed', function (req, res) {
//        res.render(path.join(__dirname, '/views/failed'), {title: 'failed!!!', user: req.user});
//    });
};