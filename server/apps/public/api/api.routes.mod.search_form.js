module.exports = function (app, uriBase) {
    var url = require('url');

    // modules
    var DonationRepo = require('../../../domain/repositories/bog.domain.repositories.donation');
    var ErrorHandler = require('../../../modules/bog.errors');

    var err_handler = new ErrorHandler();

    // Collection Routes
    var collectionUri = uriBase + '/donations';

    // CORS
    app.all(collectionUri + '/*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });
    app.get(collectionUri + '/', function (req, res) {
        var user = req.user;
        var domainRepo = new DonationRepo(user);
        var depth = 1;
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

    // Model Routes
    var singleUri = uriBase + '/donation';

    // CORS
    app.all(singleUri + '/*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    // View Donation
    app.get(singleUri + '/:id', function (req, res) {
        var user = req.user;
        var domainRepo = new DonationRepo(user);

        var depth = req.query.depth;
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

    // Add Donation
    app.post(singleUri + '/', function (req, res) {
        var user = req.user;
        var domainRepo = new DonationRepo(user);

        var input = req.body;
        if (!input) {
            res.json(500, err_handler.wrap(5004));
            return;
        }

        domainRepo.add(input, function (err, result) {
            if (err) {
                res.json(500, err_handler.wrap(1001, null, err));
                return;
            }
            res.json(200, result);
        });
    });

    // Update Donation
    app.put(singleUri + '/:id', function (req, res) {
        var user = req.user;
        var domainRepo = new DonationRepo(user);
        var id = req.params.id;
        if (!id) {
            res.json(500, err_handler.wrap(5000));
            return;
        }
        var input = req.body;
        if (!input) {
            res.json(500, err_handler.wrap(5004));
            return;
        }

        domainRepo.update(id, input, function (err, result) {
            if (err) {
                res.json(500, err_handler.wrap(1001, null, err));
                return;
            }
            res.json(200, result);
        });
    });

    // Delete Donation
    app.delete(singleUri + '/:id', function (req, res) {
        var user = req.user;
        var domainRepo = new DonationRepo(user);

        var id = req.params.id;
        if (!id) {
            res.json(500, err_handler.wrap(5000));
            return;
        }

        domainRepo.deleteById(id, function (err, result) {
            if (err) {
                res.json(500, err_handler.wrap(1001, null, err));
                return;
            }
            res.json(200, result);
        });
    });
    app.delete(singleUri + '/', function (req, res) {
        var user = req.user;
        var domainRepo = new DonationRepo(user);

        var input = req.body;
        if (!input) {
            res.json(500, err_handler.wrap(5004));
            return;
        }
        var id = input.id;
        if (!id) {
            res.json(500, err_handler.wrap(5000));
            return;
        }

        domainRepo.deleteById(id, function (err, result) {
            if (err) {
                res.json(500, err_handler.wrap(1001, null, err));
                return;
            }
            res.json(200, result);
        });
    });


    // Get All Locations for Donation
    app.get(singleUri + '/:donationid/ploc/', function (req, res) {
        var user = req.user;
        var domainRepo = new DonationRepo(user);

        var id = req.params.donationid;
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
    app.get(singleUri + '/:donationid/ploc/:locid', function (req, res) {
        var user = req.user;
        var domainRepo = new DonationRepo(user);

        var donationid = req.params.donationid;
        if (!donationid) {
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

        domainRepo.plocById(donationid, locid, depth, function (err, item) {
            returnCollection(res, err, item);
        });
    });
    // Add Physical Location
    app.post(singleUri + '/:donationid/ploc/', function (req, res) {
        var user = req.user;
        var domainRepo = new DonationRepo(user);

        var donationid = req.params.donationid;
        if (!donationid) {
            res.json(500, err_handler.wrap(5000));
            return;
        }
        var input = req.body;
        if (!input) {
            res.json(500, err_handler.wrap(5103));
            return;
        }
        domainRepo.addPloc(donationid, input, function (err, result) {
            if (err) {
                res.json(500, err_handler.wrap(1001, null, err));
                return;
            }
            res.json(200, result);
        });
    });
    // Update Physical Location
    app.put(singleUri + '/:donationid/ploc/:locid', function (req, res) {
        var user = req.user;
        var domainRepo = new DonationRepo(user);

        var donationid = req.params.donationid;
        if (!donationid) {
            res.json(500, err_handler.wrap(5000));
            return;
        }
        var locid = req.params.locid;
        if (!locid) {
            res.json(500, err_handler.wrap(5100));
            return;
        }
        var input = req.body;
        if (!input) {
            res.json(500, err_handler.wrap(5104));
            return;
        }
        domainRepo.updatePloc(donationid, locid, input, function (err, result) {
            if (err) {
                res.json(500, err_handler.wrap(1001, null, err));
                return;
            }
            res.json(200, result);
        });
    });
    // Delete Physical Location
    app.delete(singleUri + '/:donationid/ploc/:locid', function (req, res) {
        var user = req.user;
        var domainRepo = new DonationRepo(user);

        var donationid = req.params.donationid;
        if (!donationid) {
            res.json(500, err_handler.wrap(5000));
            return;
        }

        var locid = req.params.locid;
        if (!locid) {
            res.json(500, err_handler.wrap(5100));
            return;
        }
        domainRepo.removePloc(donationid, locid, function (err, result) {
            if (err) {
                res.json(500, err_handler.wrap(1001, null, err));
                return;
            }
            res.json(200, result);
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