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
                User.findByPassportProfile(profile, function(err, user){
                    if(user && !err) {
                        console.log('User is found and no errors.  Update account from the profile information and return.');
                        User.MapPassportProfileToUser(profile, user, function(err, user){
                            user.save(function (err, user) {
                                if(err) {console.log(err)}
                                done(err, user);
                            });
                        })
                    }
                    if(!user && !err) {
                        console.log('No user exists and no errors.  Create a new account from the profile information and return.');
                        User.MapPassportProfileToUser(profile, new User(), function(err, user){
                            user.save(function (err, user) {
                                if(err) {console.log(err)}
                                done(err, user);
                            });
                        })
                    }
                    if(user && err)
                    {
                        switch (err) {
                            case "email match":
                                console.log('An account is in the system with a matching email. Present to user for confirmation.');
                                done(err, user);
                                break;
                        }
                    }
                });
            });
        }
    ));

    var fb_login_handler    = Passport.authenticate('facebook', { scope: [ 'email', 'user_photos'] });
    var fb_callback_handler = Passport.authenticate('facebook', { failureRedirect: '/auth/failed/' });
    var fb_callback_handler2 = function(req, res) {
        res.redirect('/auth/success/');
        };

    app.get(uriBase + '/', fb_login_handler);

    app.get(uriBase + '/return', fb_callback_handler , fb_callback_handler2);
};