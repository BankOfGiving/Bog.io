module.exports = function (app, base_uri) {
    var url = require('url');

    var mod_uri = base_uri + '/mod';

    require('./mod/ad-static/api.routes.mod.ad-static')(app, mod_uri);
    require('./mod/column/api.routes.mod.column')(app, mod_uri);
    require('./mod/masthead/api.routes.mod.masthead')(app, mod_uri);
    require('./mod/nav/api.routes.mod.nav')(app, mod_uri);
    require('./mod/search-form/api.routes.mod.search-form')(app, mod_uri);
    require('./mod/search-results-container/api.routes.mod.search-results-container')(app, mod_uri);
    require('./mod/text/api.routes.mod.text')(app, mod_uri);
    require('./mod/titlebar/api.routes.mod.titlebar')(app, mod_uri);

    // CORS
    app.all(base_uri + '/*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });
    app.get(base_uri + '/culture', function (req, res) {
        // TODO: 1. If user is logged in, check profile.
        // TODO: 2. Return accept-language from header.
        var culture = null;
        if (!culture) {
            culture = req.headers["accept-language"].split(',')[0];
        }
        if (culture) {
            res.send(200, 'en-US');
        } else {
            res.send(500);
        }
    });
};