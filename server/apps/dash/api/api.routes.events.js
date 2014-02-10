module.exports = function (app, uriBase) {
    // modules
    var EventRepo = require('../../../domain/repositories/bog.domain.repositories.event');
    var auth = require('../../../modules/bog.authentication');

    // Collection Routes
    var collectionUri = uriBase + '/events';

    // CORS
    app.all(collectionUri + '/*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });
};