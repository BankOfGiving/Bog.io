module.exports = function (app, uri_base) {
    var url = require('url');

    // modules
    var DonationRepo = require('../../../../domain/repositories/bog.domain.repositories.donation.js');
    var ErrorHandler = require('../../../../bog/bog.errors.js');

    var err_handler = new ErrorHandler();

    // CORS
    app.all(uri_base + '/*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    app.get(uri_base + '/', function (req, res) {
        var user = req.user;
        var domainRepo = new DonationRepo(user);
        var depth = 2;
        if (!depth) {
            res.json(400, err_handler.wrap(5000));
        }

        var filter = req.query.filter;
        if (filter) {
            domainRepo.filtered(filter, depth, function (err, coll) {
                returnCollection(res, err, coll);
            });
        } else {
            domainRepo.all(depth, function (err, coll) {
                returnCollection(res, err, coll);
            });
        }
    });

    app.post(uri_base + '/:uid?', function (req, res) {
        switch (req.params.uid) {
            case "":
                // Add logic for special search forms.
                break;
            default:
                search_all(req, res);
                break;
        }
    });

    var search_all = function (req, res) {
        var user = req.user;
        var domainRepo = new DonationRepo(user);
        var depth = 2;
        if (!depth) {
            res.json(err_handler.wrap(5000));
        }
        var filter = req.body.search_filter;
        if (filter) {
            domainRepo.filtered(filter, depth, function (err, coll) {
                return_results(res, err, coll);
            });
        } else {
            domainRepo.all(depth, function (err, coll) {
                return_results(res, err, coll);
            });
        }
    };


    /*    var return_results = function (res, err, coll) {
     if (err) {
     var ret_err = err_handler.wrap(1001, null, err);
     res.send(500, ret_err);
     } else {
     if (!coll || typeof(coll) === 'undefined') {
     res.json(204, err_handler.wrap(5004));
     return;
     }
     if (coll.length === 0) {
     res.json(204, err_handler.wrap(5004));
     return;
     }
     if (coll) {
     res.json(coll);
     }
     }
     };*/

    var return_results = function (res, err, coll) {
        if (err) {
            var ret_err = err_handler.wrap(1001, null, err);
            console.log('ERR:  ' + JSON.stringify(ret_err));
            res.send(500, ret_err);
        } else {
            if (!coll || typeof(coll) === 'undefined') {
                res.json(204, err_handler.wrap(5004));
                return;
            }
            if (coll.length === 0) {
                res.json(204, err_handler.wrap(5004));
                return;
            }
            if (coll) {
                res.send(200, coll);
            }
        }
    };
};