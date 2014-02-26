module.exports = function (app, express) {
    var path = require('path');
    var uriBase = '/auth';

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

    app.use(uriBase + '/fonts', express.static(path.join(__dirname, '../../../client/apps/fonts')));
    app.use(uriBase + '/img', express.static(path.join(__dirname, '../../../client/apps/img')));
    app.use(uriBase + '/scripts', express.static(path.join(__dirname, '../../../client/apps/auth/' + asset_location + '/scripts')));
    app.use(uriBase + '/styles', express.static(path.join(__dirname, '../../../client/apps/auth/' + asset_location + '/styles')));

    app.get(uriBase + '/', userController.getLogin);
    app.get(uriBase + '/login', userController.getLogin);
    app.post(uriBase + '/login', userController.postLogin);
    app.get(uriBase + '/logout', userController.logout);
    app.get(uriBase + '/signup', userController.getSignup);
    app.post(uriBase + '/signup', userController.postSignup);
    app.get(uriBase + '/contact', contactController.getContact);
    app.post(uriBase + '/contact', contactController.postContact);

    /** Auth Account routes. */

    app.get(uriBase + '/account', passportConf.isAuthenticated, userController.getAccount);
    app.post(uriBase + '/account/profile', passportConf.isAuthenticated, userController.postUpdateProfile);
    app.post(uriBase + '/account/password', passportConf.isAuthenticated, userController.postUpdatePassword);
    app.post(uriBase + '/account/delete', passportConf.isAuthenticated, userController.postDeleteAccount);
    app.get(uriBase + '/account/unlink/:provider', passportConf.isAuthenticated, userController.getOauthUnlink);

    /** Auth Api routes. */

    app.get(uriBase + '/api', apiController.getApi);
    app.get(uriBase + '/api/lastfm', apiController.getLastfm);
    app.get(uriBase + '/api/nyt', apiController.getNewYorkTimes);
    app.get(uriBase + '/api/aviary', apiController.getAviary);
    app.get(uriBase + '/api/paypal', apiController.getPayPal);
    app.get(uriBase + '/api/paypal/success', apiController.getPayPalSuccess);
    app.get(uriBase + '/api/paypal/cancel', apiController.getPayPalCancel);
    app.get(uriBase + '/api/steam', apiController.getSteam);
    app.get(uriBase + '/api/scraping', apiController.getScraping);
    app.get(uriBase + '/api/foursquare', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getFoursquare);
    app.get(uriBase + '/api/tumblr', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getTumblr);
    app.get(uriBase + '/api/facebook', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getFacebook);
    app.get(uriBase + '/api/github', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getGithub);
    app.get(uriBase + '/api/twitter', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getTwitter);

    app.get(uriBase + '/api/isAuthenticated', function (req, res) {
        res.send(req.isAuthenticated());
    });

    /** OAuth routes for sign-in. */

    app.get(uriBase + '/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
    app.get(uriBase + '/facebook/callback', passport.authenticate('facebook', { successRedirect: uriBase + '/', failureRedirect: uriBase + '/login' }));
    app.get(uriBase + '/github', passport.authenticate('github'));
    app.get(uriBase + '/github/callback', passport.authenticate('github', { successRedirect: uriBase + '/', failureRedirect: uriBase + '/login' }));
    app.get(uriBase + '/google', passport.authenticate('google', { scope: 'profile email' }));
    app.get(uriBase + '/google/callback', passport.authenticate('google', { successRedirect: uriBase + '/', failureRedirect: uriBase + '/login' }));
    app.get(uriBase + '/twitter', passport.authenticate('twitter'));
    app.get(uriBase + '/twitter/callback', function (req, res) {
        if (passportConf.isAuthenticated) {
            res.send(200);
        } else {
            res.send(401);
        }
    });

    /** OAuth routes for API examples that require authorization. */

    app.get(uriBase + '/foursquare', passport.authorize('foursquare'));
    app.get(uriBase + '/foursquare/callback', passport.authorize('foursquare', { failureRedirect: uriBase + '/api' }), function (req, res) {
        res.redirect(uriBase + '/api/foursquare');
    });
    app.get(uriBase + '/tumblr', passport.authorize('tumblr'));
    app.get(uriBase + '/tumblr/callback', passport.authorize('tumblr', { failureRedirect: uriBase + '/api' }), function (req, res) {
        res.redirect(uriBase + '/api/tumblr');
    });
};