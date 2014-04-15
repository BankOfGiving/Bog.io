module.exports = function (app, api_base) {
    var url = require('url');

    // modules
    var EventTypeRepo = require('../../../../domain/repositories/bog.domain.repositories.event.type.js');
    var EventStatusesRepo = require('../../../../domain/repositories/bog.domain.repositories.status.js');
    var EventRepo = require('../../../../domain/repositories/bog.domain.repositories.event.js');
    var ErrorHandler = require('../../../../bog/bog.errors.js');

    var err_handler = new ErrorHandler();

    // CORS
    app.all(api_base + '/*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    app.get(api_base + '/', function (req, res) {
        var view_data = {};
        var eventRepo = new EventRepo();
        var statusesRepo = new EventStatusesRepo();
        var typesRepo = new EventTypeRepo();

        eventRepo.empty('detail', function (err, model) {
            if (err) {
                res.json(err_handler.wrap(5004));
            } else {
                view_data.event_model = model;
                typesRepo.all(function (err, coll) {
                    if (err) {
                        res.json(err_handler.wrap(5004));
                    } else {
                        view_data.event_types = coll;
                        statusesRepo.all(function (err, coll) {
                            if (err) {
                                res.json(err_handler.wrap(5004));
                            } else {
                                view_data.event_statuses = coll;
                                res.json(view_data);
                            }
                        });
                    }
                });
            }
        });
    });

    // View Event
    app.get(api_base + '/:id', function (req, res) {
        var user = req.user;
        var domainRepo = new EventRepo(user);
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

    // Add Event
    app.post(api_base + '/', function (req, res) {
        var user = req.user;
        var domainRepo = new EventRepo(user);

        var input = req.body;
        console.log(input);
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

    // Update Event
    app.put(api_base + '/:id', function (req, res) {
        var user = req.user;
        var domainRepo = new EventRepo(user);
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

    // Delete Event
    app.delete(api_base + '/:id', function (req, res) {
        var user = req.user;
        var domainRepo = new EventRepo(user);

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
    app.delete(api_base + '/', function (req, res) {
        var user = req.user;
        var domainRepo = new EventRepo(user);

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

    // Get All Locations for Event
    app.get(api_base + '/:eventid/ploc/', function (req, res) {
        var user = req.user;
        var domainRepo = new EventRepo(user);

        var id = req.params.eventid;
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
    app.get(api_base + '/:eventid/ploc/:locid', function (req, res) {
        var user = req.user;
        var domainRepo = new EventRepo(user);

        var eventid = req.params.eventid;
        if (!eventid) {
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

        domainRepo.plocById(eventid, locid, depth, function (err, item) {
            returnCollection(res, err, item);
        });
    });
    // Add Physical Location
    app.post(api_base + '/:eventid/ploc/', function (req, res) {
        var user = req.user;
        var domainRepo = new EventRepo(user);

        var eventid = req.params.eventid;
        if (!eventid) {
            res.json(500, err_handler.wrap(5000));
            return;
        }
        var input = req.body;
        if (!input) {
            res.json(500, err_handler.wrap(5103));
            return;
        }
        domainRepo.addPloc(eventid, input, function (err, result) {
            if (err) {
                res.json(500, err_handler.wrap(1001, null, err));
                return;
            }
            res.json(200, result);
        });
    });
    // Update Physical Location
    app.put(api_base + '/:eventid/ploc/:locid', function (req, res) {
        var user = req.user;
        var domainRepo = new EventRepo(user);

        var eventid = req.params.eventid;
        if (!eventid) {
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
        domainRepo.updatePloc(eventid, locid, input, function (err, result) {
            if (err) {
                res.json(500, err_handler.wrap(1001, null, err));
                return;
            }
            res.json(200, result);
        });
    });
    // Delete Physical Location
    app.delete(api_base + '/:eventid/ploc/:locid', function (req, res) {
        var user = req.user;
        var domainRepo = new EventRepo(user);

        var eventid = req.params.eventid;
        if (!eventid) {
            res.json(500, err_handler.wrap(5000));
            return;
        }

        var locid = req.params.locid;
        if (!locid) {
            res.json(500, err_handler.wrap(5100));
            return;
        }
        domainRepo.removePloc(eventid, locid, function (err, result) {
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