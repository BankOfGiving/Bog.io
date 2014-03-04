module.exports = function (app, base_uri) {
    var url = require('url');
    var ErrorHandler = require('../../../../../bog/bog.errors.js');
    var err_handler = new ErrorHandler();

    // Collection Routes
    var mod_uri = base_uri + '/nav';

    // CORS
    app.all(mod_uri + '/*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });
    // Internationalization
    app.get(mod_uri + '/text/:key', function (req, res) {
        var loc_key = req.params.key;
        try {
            var loc_text = require("./text/" + loc_key);
            res.json(loc_text);
        } catch (e) {
            res.send(400);
        }
    });
};