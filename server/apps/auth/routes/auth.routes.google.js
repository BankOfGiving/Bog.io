module.exports = function(app, uriBase) {
    uriBase = uriBase + '/google';

    // components
    var Passport = require('passport');

    app.get(uriBase + '/', Passport.authenticate('google', { scope: [ 'email', 'user_photos'] }));
    app.get(uriBase + '/return', Passport.authenticate('google', { failureRedirect : '/auth/failure/' }), function (req, res) {
        res.redirect('/auth/success/');
    });
};
