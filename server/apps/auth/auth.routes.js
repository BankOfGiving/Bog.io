module.exports = function(app) {
    path = require('path');

    var uriBase = '/auth';

    require('./routes/auth.routes.facebook.js')(app, uriBase);
    require('./routes/auth.routes.google.js')(app, uriBase);
    require('./routes/auth.routes.twitter.js')(app, uriBase);

    app.get(uriBase + '/', function(req, res){
        res.render(path.join(__dirname, '../views/login'), {
            title: 'Login',
            stylesheet: 'login'})
    });

    app.get(uriBase + '/logout', function (req, res) {
        req.logOut();
        res.redirect('/');
    });

    app.get(uriBase + '/success', function(req, res){
        req.logIn(user, function(err) {
            if (err) { res.send(400, err); }
            res.render(path.join(__dirname, '/views/success'), {user: req.user});
        });
    });
    app.get(uriBase + '/failed', function(req, res){
        res.render(path.join(__dirname, '/views/failed'), {title: 'failed!!!', user: req.user});
    });
};