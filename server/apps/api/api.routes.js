module.exports = function (app) {

    var uriBase = '/api/v1';

    // CORS
    app.all(uriBase + '*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

//    require('./api.routes.auth.js')(app, uriBase);
//    require('./api.routes.donations.js')(app, uriBase);
//    require('./api.routes.events.js')(app, uriBase);
//    require('./api.routes.profile.js')(app, uriBase);
//    require('./api.routes.solicitations.js')(app, uriBase);
//    require('./api.routes.search.js')(app, uriBase);

    app.get(uriBase + '/', function (req, res) {

        var donationRepo = require('/domain/models/bog.domain.repositories.donation');

        donationRepo.
            res.send(200, { user: req.user });
    });
};