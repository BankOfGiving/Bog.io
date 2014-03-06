module.exports = function (app, mod_uri) {
    var url = require('url');
    var path = require('path');

    // Localization Text
    app.get(mod_uri + '/text/:key', function (req, res) {
        var loc_key = req.params.key;
        try {
            var loc_text = require("../i18n/text/" + loc_key);
            res.json(loc_text);
        } catch (e) {
            console.log(e);
            res.send(400);
        }
    });
};