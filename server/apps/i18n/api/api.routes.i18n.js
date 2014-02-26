module.exports = function (app, uriBase) {
    // var url = require('url');

    // var err_handler = new ErrorHandler();

    // Collection Routes
    var baseUri = uriBase + '/i18n';

    // CORS
    app.all(baseUri + '/*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });
    app.get(baseUri + '/culture', function (req, res) {
        // TODO: 1. If user is logged in, check profile.
        // TODO: 2. Return accept-language from header.
        var culture = null;
        if (!culture) {
            culture = req.headers["accept-language"].split(',')[0];
        }
        if (culture) {
            console.log('CULTURE:  ' + culture);
            //res.send(200, 'es-MX');
            res.send(200, 'en-US');
        } else {
            res.send(500);
        }
    });

    app.get(baseUri + '/text/:key', function (req, res) {
        var loc_path = req.params.key;
        loc_path = "../text/" + loc_path;
        console.log("LOC_PATH:  " + loc_path);
        try {
            var loc_text = require("../text/" + loc_path);
            res.json(loc_text);
        } catch (e) {
            res.send(400);
        }
    });
};