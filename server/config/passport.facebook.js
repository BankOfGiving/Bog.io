var Passport = require('passport');

module.exports = function () {

    var FacebookStrategy = require('passport-facebook').Strategy;

    // modules
    var User = require('../../../models/user.model');

    // modules
    var fbcfg = require('./oauth.facebook.js');

    // locals
    var clientID = fbcfg.appId;
    var clientSecret = fbcfg.appSecret;
    var callbackURL = fbcfg.url + uriBase + "/return";

    Passport.serializeUser(function (user, done) {
        done(null, user._id);
    });
    Passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
    Passport.use(new FacebookStrategy({
            clientID: clientID,
            clientSecret: clientSecret,
            callbackURL: callbackURL
        },
        function (accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                User.findByPassportProfile(profile, function (err, user) {
                    if (user && !err) {
                        console.log('User is found and no errors.  Update account from the profile information and return.');
                        User.MapPassportProfileToUser(profile, user, function (err, user) {
                            console.log('Provider profile information mapped to user object.');
                            user.save(function (err, user) {
                                if (err) {
                                    console.log(err)
                                }
                                console.log('User object saved.');
                                done(err, user);
                            });
                        })
                    }
                    if (!user && !err) {
                        console.log('No user exists and no errors.  Create a new account from the profile information and return.');
                        User.MapPassportProfileToUser(profile, new User(), function (err, user) {
                            user.save(function (err, user) {
                                if (err) {
                                    console.log(err)
                                }
                                done(err, user);
                            });
                        })
                    }
                    if (user && err) {
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
};