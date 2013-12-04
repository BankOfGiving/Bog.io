var Passport = require('passport');

var strategy = function() {

    var FacebookStrategy = require('passport-facebook').Strategy;

    // modules
    var User = require('../../../models/user.model');

    // modules
    var apiConfig = require('./facebook.api.js');

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
};
module.exports = Passport;
