module.exports = function (app, express) {
    var path = require('path');
    var base_uri = '/auth';

    /** Module dependencies. */
    var passport = require('passport');

    /** API keys + Passport configuration. */
    var passportConf = require('./config/passport');

    /** Load controllers. */
    var homeController = require('./controllers/home');
    var userController = require('./controllers/user');
    var apiController = require('./controllers/api');
    var contactController = require('./controllers/contact');

    app.set('views', path.join(__dirname, '/views'));

    /** Auth routes. */
    var asset_location = 'src';
    switch (app.get('env')) {
        case 'development':
            app.use(express.errorHandler());
            break;
        case 'staging':
            //asset_location = 'dist';
            break;
        case 'production':
            //asset_location = 'dist';
            break;
    }

    app.use(base_uri + '/fonts', express.static(path.join(__dirname, '../../../client/apps/fonts')));
    app.use(base_uri + '/img', express.static(path.join(__dirname, '../../../client/apps/img')));
    app.use(base_uri + '/scripts', express.static(path.join(__dirname, '../../../client/apps/auth/' + asset_location + '/scripts')));
    app.use(base_uri + '/styles', express.static(path.join(__dirname, '../../../client/apps/auth/' + asset_location + '/styles')));

    app.get(base_uri + '/', userController.getLogin);
    app.get(base_uri + '/login', userController.getLogin);
    app.post(base_uri + '/login', userController.postLogin);
    app.get(base_uri + '/logout', userController.logout);
    app.get(base_uri + '/signup', userController.getSignup);
    app.post(base_uri + '/signup', userController.postSignup);
    app.get(base_uri + '/contact', contactController.getContact);
    app.post(base_uri + '/contact', contactController.postContact);

    /** Auth Account routes. */

    app.get(base_uri + '/account', passportConf.isAuthenticated, userController.getAccount);
    app.post(base_uri + '/account/profile', passportConf.isAuthenticated, userController.postUpdateProfile);
    app.post(base_uri + '/account/password', passportConf.isAuthenticated, userController.postUpdatePassword);
    app.post(base_uri + '/account/delete', passportConf.isAuthenticated, userController.postDeleteAccount);
    app.get(base_uri + '/account/unlink/:provider', passportConf.isAuthenticated, userController.getOauthUnlink);

    /** Auth Api routes. */

    app.get(base_uri + '/api', apiController.getApi);
    app.get(base_uri + '/api/aviary', apiController.getAviary);
    app.get(base_uri + '/api/scraping', apiController.getScraping);
    app.get(base_uri + '/api/facebook', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getFacebook);
    app.get(base_uri + '/api/twitter', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getTwitter);
    app.get(base_uri + '/api/isAuthenticated', function (req, res) {
        var is_auth = req.isAuthenticated();
        if (is_auth) {
            res.json({
                "is_auth": true,
                "user": req.user
            });
        } else {
            res.json({
                "is_auth": false
            });
        }
    });
//    app.get(base_uri + '/api/foursquare', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getFoursquare);
//    app.get(base_uri + '/api/tumblr', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getTumblr);
//    app.get(base_uri + '/api/lastfm', apiController.getLastfm);
//    app.get(base_uri + '/api/nyt', apiController.getNewYorkTimes);
//    app.get(base_uri + '/api/paypal', apiController.getPayPal);
//    app.get(base_uri + '/api/paypal/success', apiController.getPayPalSuccess);
//    app.get(base_uri + '/api/paypal/cancel', apiController.getPayPalCancel);
//    app.get(base_uri + '/api/steam', apiController.getSteam);
//    app.get(base_uri + '/api/github', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getGithub);

    /** OAuth routes for sign-in. */

    app.get(base_uri + '/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
    app.get(base_uri + '/facebook/callback', passport.authenticate('facebook', { successRedirect: base_uri + '/', failureRedirect: base_uri + '/login' }));
    app.get(base_uri + '/github', passport.authenticate('github'));
    app.get(base_uri + '/github/callback', passport.authenticate('github', { successRedirect: base_uri + '/', failureRedirect: base_uri + '/login' }));
    app.get(base_uri + '/google', passport.authenticate('google', { scope: 'profile email' }));
    app.get(base_uri + '/google/callback', passport.authenticate('google', { successRedirect: base_uri + '/', failureRedirect: base_uri + '/login' }));
    app.get(base_uri + '/twitter', passport.authenticate('twitter'));
    app.get(base_uri + '/twitter/callback', function (req, res) {
        if (passportConf.isAuthenticated) {
            res.send(200);
        } else {
            res.send(401);
        }
    });

    /** OAuth routes for API examples that require authorization.

     app.get(base_uri + '/foursquare', passport.authorize('foursquare'));
     app.get(base_uri + '/foursquare/callback', passport.authorize('foursquare', { failureRedirect: base_uri + '/api' }), function (req, res) {
        res.redirect(base_uri + '/api/foursquare');
    });
     app.get(base_uri + '/tumblr', passport.authorize('tumblr'));
     app.get(base_uri + '/tumblr/callback', passport.authorize('tumblr', { failureRedirect: base_uri + '/api' }), function (req, res) {
        res.redirect(base_uri + '/api/tumblr');
    });
     */
};