module.exports = function (app) {
    var path = require('path');

    var uriBase = '/dash';

    app.get(uriBase + '/', function (req, res) {
        res.render(__dirname + '/views/index', { user: req.user });
    });
};