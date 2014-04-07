module.exports = function (app, api_uri) {
    var url = require('url');

    // CORS
    app.all(api_uri + '/*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });
    app.get(api_uri + '/culture', function (req, res) {
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

    app.get(api_uri + '/auth', function (req, res) {
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

    var mod_uri = api_uri + '/mod';

    require('./mod/ad-static/routes')(app, mod_uri + '/ad-static');
    require('./mod/article/routes')(app, mod_uri + '/article');
    require('./mod/column/routes')(app, mod_uri + '/column');
    require('./mod/event-display/routes')(app, mod_uri + '/event-display');
    require('./mod/markup/routes')(app, mod_uri + '/markup');
    require('./mod/masthead/routes')(app, mod_uri + '/masthead');
    require('./mod/nav/routes')(app, mod_uri + '/nav');
    require('./mod/search-form/routes')(app, mod_uri + '/search-form');
    require('./mod/search-results-container/routes')(app, mod_uri + '/search-results-container');
    require('./mod/text/routes')(app, mod_uri + '/text');
    require('./mod/titlebar/routes')(app, mod_uri + '/titlebar');

    var data_uri = api_uri + '/data';

    require('./data/api.routes.events')(app, data_uri + '/events');
    require('./data/api.routes.event')(app, data_uri + '/event');
};