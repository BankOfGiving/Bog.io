module.exports = function (app, uriBase) {
    uriBase = uriBase + '/twitter';

    // components
    var Passport = require('passport');
    app.get(uriBase + '/', Passport.authenticate('twitter', { scope: [ 'email', 'user_photos'] }));
    app.get(uriBase + '/return', Passport.authenticate('twitter', { failureRedirect: '/auth/failure/' }), function (req, res) {
        res.redirect('/auth/success/');
    });
};