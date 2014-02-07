module.exports = function (app, uriBase) {
    uriBase = uriBase + '/fb';

    var Passport = require('passport');

    // modules
    var apiConfig = require('../../../config/passport.facebook.js');

    app.get(uriBase + '/', Passport.authenticate('facebook', { scope: [ 'email', 'user_photos'] }));

    app.get(uriBase + '/return',
        Passport.authenticate('facebook', { failureRedirect: '/auth/failed/' }),
        function (req, res) {
            res.redirect('/auth/success/');
        }
    );
};