module.exports = function(app, uriBase) {
    uriBase = uriBase + '/fb';

    var Passport = require('passport');
    var FacebookStrategy = require('passport-facebook').Strategy;

    // modules
    var User = require('../../../models/user.model');

    // modules
    var apiConfig = require('../../../config/facebook.api.js');

    // locals
    var clientID = apiConfig.appId;
    var clientSecret = apiConfig.appSecret;
    var callbackURL = apiConfig.url + uriBase + "/return";

    Passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    Passport.deserializeUser(function(id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
    Passport.use(new FacebookStrategy({
            clientID: clientID,
            clientSecret: clientSecret,
            callbackURL: callbackURL
        },
        function(accessToken, refreshtoken, profile, done) {
            process.nextTick(function () {
                User.GetUserFromFacebookProfile(profile, function(err, user){
                    console.log('DONE:USER: ' + user);
                    console.log('DONE:ERR: ' + err);
                    done(err, user);
                });
            });
        }
    ));

    var fb_login_handler    = Passport.authenticate('facebook', { scope: [ 'email', 'user_photos'] });
    var fb_callback_handler = Passport.authenticate('facebook', { successRedirect: '/auth/success/', failureRedirect : '/auth/failed/'});
    var fb_callback_handler2 = function(req, res) {
        console.log('we b logged in!');
        console.dir(req.user);
    };

    app.get(uriBase + '/', fb_login_handler);

    app.get(uriBase + '/return',
        Passport.authenticate('facebook', { failureRedirect: '/auth/failed/' }),
        function(req, res) {
            res.redirect('/auth/success/');
        });

    //app.get(uriBase + '/return', fb_callback_handler, fb_callback_handler2);
};