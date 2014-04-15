module.exports = function (app, uri_base) {
    var url = require('url');

    // modules
    var DonationTypeRepo = require('../../../../domain/repositories/bog.domain.repositories.donation.type.js');
    var DonationStatusesRepo = require('../../../../domain/repositories/bog.domain.repositories.status.js');
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
        var view_data = {};
        var DonationRepo = new DonationRepo();
        var statusesRepo = new DonationStatusesRepo();
        var typesRepo = new DonationTypeRepo();

        DonationRepo.empty('detail', function (err, model) {
            if (err) {
                res.json(err_handler.wrap(5004));
            } else {
                view_data.Donation_model = model;
                typesRepo.all(function (err, coll) {
                    if (err) {
                        res.json(err_handler.wrap(5004));
                    } else {
                        view_data.Donation_types = coll;
                        statusesRepo.all(function (err, coll) {
                            if (err) {
                                res.json(err_handler.wrap(5004));
                            } else {
                                view_data.Donation_statuses = coll;
                                res.json(view_data);
                            }
                        });
                    }
                });
            }
        });
    });

    // View Donation
    app.get(uri_base + '/:id', function (req, res) {
        var user = req.user;
        var domainRepo = new DonationRepo(user);
        var depth = 3;
        if (!depth) {
            res.json(500, err_handler.wrap(5002));
            return;
        }

        var id = req.params.id;
        if (!id) {
            res.json(500, err_handler.wrap(5000));
            return;
        }
        domainRepo.byId(id, depth, function (err, item) {
            returnSingle(res, err, item);
        });
    });

    // Get All Locations for Donation
    app.get(uri_base + '/:Donationid/ploc/', function (req, res) {
        var user = req.user;
        var domainRepo = new DonationRepo(user);

        var id = req.params.Donationid;
        if (!id) {
            res.json(500, err_handler.wrap(5000));
            return;
        }

        var depth = req.query.depth;
        if (!depth) {
            res.json(500, err_handler.wrap(5102));
            return;
        }

        domainRepo.byId(id, depth, function (err, item) {
            returnCollection(res, err, item.locations_physical);
        });
    });
    // Single Physical Location
    app.get(uri_base + '/:Donationid/ploc/:locid', function (req, res) {
        var user = req.user;
        var domainRepo = new DonationRepo(user);

        var Donationid = req.params.Donationid;
        if (!Donationid) {
            res.json(500, err_handler.wrap(5000));
            return;
        }
        var locid = req.params.locid;
        if (!locid) {
            res.json(500, err_handler.wrap(5100));
            return;
        }

        var depth = req.query.depth;
        if (!depth) {
            res.json(500, err_handler.wrap(5102));
            return;
        }

        domainRepo.plocById(Donationid, locid, depth, function (err, item) {
            returnCollection(res, err, item);
        });
    });

    var returnCollection = function (res, err, coll) {
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
    var returnSingle = function (res, err, item) {
        if (err) {
            res.json(500, err_handler.wrap(1001, null, err));
        } else {
            if (!item || typeof(item) == 'undefined') {
                res.json(204, err_handler.wrap(5004));
                return;
            }
            if (item) {
                res.send(200, item);
            }
        }
    };
};