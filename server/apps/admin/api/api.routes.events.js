module.exports = function (app, uriBase) {
    var url = require('url');

    // modules
    var EventRepo = require('../../../domain/repositories/bog.domain.repositories.event');
    var ErrorHandler = require('../../../modules/bog.errors');

    var err_handler = new ErrorHandler();

    // Collection Routes
    var collectionUri = uriBase + '/events';

    // CORS
    app.all(collectionUri + '/*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });
    app.get(collectionUri + '/', function (req, res) {
        var user = req.user;
        var domainRepo = new EventRepo(user);
        var depth = req.query.depth;
        var filter = req.query.filter;
        if (!depth) {
            res.json(400, err_handler.wrapForResponse(400, 'Specify depth.'));
        }
        if (!filter && depth) {
            domainRepo.all(depth, function (err, coll) {
                returnCollection(res, err, coll);
            });
            return;
        }
        if (filter && depth) {
            domainRepo.filtered(filter, depth, function (err, coll) {
                returnCollection(res, err, coll);
            });
            return;
        }

        res.json(400, err_handler.wrapForResponse(400, 'Invalid request.'));
    });

    // Model Routes
    var singleUri = uriBase + '/event';

    // CORS
    app.all(singleUri + '/*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    // View Event
    app.get(singleUri + '/:id', function (req, res) {
        var user = req.user;
        var domainRepo = new EventRepo(user);
        var depth = req.query.depth;
        if (!depth) {
            res.json(400, err_handler.wrapForResponse(400, 'Specify depth.'));
            return;
        }
        var id = req.params.id;
        if (!id) {
            res.json(400, err_handler.wrapForResponse(400, 'Specify id.'));
            return;
        }
        if (id && depth) {
            domainRepo.byId(id, depth, function (err, item) {
                returnSingle(res, err, item);
            });
            return;
        }

        res.json(400, err_handler.wrapForResponse(400, 'Invalid request.'));
    });

    // Add EVent
    app.post(singleUri + '/', function (req, res) {
        var user = req.user;
        var domainRepo = new EventRepo(user);
        var input = req.body;
        if (!input) {
            res.json(400, err_handler.wrapForResponse(400, 'Specify input.'));
            return;
        }
        domainRepo.add(input, function (err, result) {
            if (err) {
                res.json(400, err_handler.wrapForResponse(400, 'Error processing request.', err));
                return;
            }
            console.log('RESULT: ' + result);
            res.json(200, result);
        });
    });

    // Update Event
    app.put(singleUri + '/', function (req, res) {
        var user = req.user;
        var domainRepo = new EventRepo(user);
        var input = req.body;
        if (!input) {
            res.json(400, err_handler.wrapForResponse(400, 'Specify input.'));
            return;
        }
        var id = input.id;
        if (!id) {
            res.json(400, err_handler.wrapForResponse(400, 'Invalid entity id.'));
            return;
        }
        domainRepo.update(input, function (err, result) {
            if (err) {
                res.json(400, err_handler.wrapForResponse(400, 'Error processing request.', err));
                return;
            }
            console.log('RESULT: ' + result);
            res.json(200, result);
        });
    });
    app.put(singleUri + '/:id', function (req, res) {
        var user = req.user;
        var domainRepo = new EventRepo(user);
        var input = req.body;
        if (!input) {
            res.json(400, err_handler.wrapForResponse(400, 'Specify input.'));
            return;
        }
        var id = req.params.id;
        if (!id) {
            res.json(400, err_handler.wrapForResponse(400, 'Invalid entity id.'));
            return;
        }
        domainRepo.update(id, input, function (err, result) {
            if (err) {
                res.json(400, err_handler.wrapForResponse(400, 'Error processing request.', err));
                return;
            }
            console.log('RESULT: ' + result);
            res.json(200, result);
        });
    });

    // Delete Event
    app.delete(singleUri + '/:id', function (req, res) {
        var user = req.user;
        var domainRepo = new EventRepo(user);
        var id = req.params.id;
        if (!id) {
            res.json(400, err_handler.wrapForResponse(400, 'Specify id.'));
            return;
        }
        domainRepo.deleteById(id, function (err, result) {
            if (err) {
                res.json(400, err_handler.wrapForResponse(400, 'Error processing request.', err));
                return;
            }
            console.log('RESULT: ' + result);
            res.json(200, result);
        });
    });
    app.delete(singleUri + '/', function (req, res) {
        var user = req.user;
        var domainRepo = new EventRepo(user);
        var input = req.body;
        if (!input) {
            res.json(400, err_handler.wrapForResponse(400, 'Specify input.'));
            return;
        }
        var id = input.id;
        if (!id) {
            res.json(400, err_handler.wrapForResponse(400, 'Specify id.'));
            return;
        }
        domainRepo.deleteById(id, function (err, result) {
            if (err) {
                res.json(400, err_handler.wrapForResponse(400, 'Error processing request.', err));
                return;
            }
            console.log('RESULT: ' + result);
            res.json(200, result);
        });
    });


    // Get All Locations for Event
    app.get(singleUri + '/:eventid/ploc/', function (req, res) {
        var user = req.user;
        var domainRepo = new EventRepo(user);
        var depth = req.query.depth;
        if (!depth) {
            res.json(400, err_handler.wrapForResponse(400, 'Specify depth.'));
            return;
        }
        var id = req.params.eventid;
        if (!id) {
            res.json(400, err_handler.wrapForResponse(400, 'Specify id.'));
            return;
        }
        if (id && depth) {
            domainRepo.byId(id, depth, function (err, item) {
                console.log();
                returnCollection(res, err, item.locations_physical);
            });
            return;
        }

        res.json(400, err_handler.wrapForResponse(400, 'Invalid request.'));
    });
    // Single Physical Location
    app.get(singleUri + '/:eventid/ploc/:locid', function (req, res) {
        var user = req.user;
        var domainRepo = new EventRepo(user);
        var depth = req.query.depth;
        var eventid = req.params.eventid;
        if (!depth) {
            res.json(400, err_handler.wrapForResponse(400, 'Specify depth.'));
            return;
        }
        if (!eventid) {
            res.json(400, err_handler.wrapForResponse(400, 'Specify event id.'));
            return;
        }
        var locid = req.params.locid;
        if (!locid) {
            res.json(400, err_handler.wrapForResponse(400, 'Specify location id.'));
            return;
        }
        if (eventid && locid && depth) {
            domainRepo.plocById(eventid, locid, depth, function (err, item) {
                returnCollection(res, err, item);
            });
            return;
        }

        res.json(400, err_handler.wrapForResponse(400, 'Invalid request.'));
    });
    // Add Physical Location
    app.post(singleUri + '/:eventid/ploc/', function (req, res) {
        var user = req.user;
        var domainRepo = new EventRepo(user);
        var eventid = req.params.eventid;
        if (!eventid) {
            res.json(400, err_handler.wrapForResponse(400, 'Specify event id.'));
            return;
        }
        var input = req.body;
        if (!input) {
            res.json(400, err_handler.wrapForResponse(400, 'Specify input.'));
            return;
        }
        domainRepo.addPloc(eventid, input, function (err, result) {
            if (err) {
                res.json(400, err_handler.wrapForResponse(400, 'Error processing request.', err));
                return;
            }
            console.log('RESULT: ' + result);
            res.json(200, result);
        });
    });
    // Update Physical Location
    app.put(singleUri + '/:eventid/ploc/:locid', function (req, res) {
        var user = req.user;
        var domainRepo = new EventRepo(user);
        var input = req.body;
        if (!input) {
            res.json(400, err_handler.wrapForResponse(400, 'Specify input.'));
            return;
        }
        var eventid = req.params.eventid;
        if (!eventid) {
            res.json(400, err_handler.wrapForResponse(400, 'Specify event id.'));
            return;
        }
        var locid = req.params.locid;
        if (!locid) {
            res.json(400, err_handler.wrapForResponse(400, 'Specify location id.'));
            return;
        }
        domainRepo.updatePloc(eventid, locid, input, function (err, result) {
            if (err) {
                res.json(400, err_handler.wrapForResponse(400, 'Error processing request.', err));
                return;
            }
            console.log('RESULT: ' + result);
            res.json(200, result);
        });
    });
    // Delete Physical Location
    app.delete(singleUri + '/:eventid/ploc/:locid', function (req, res) {
        var user = req.user;
        var domainRepo = new EventRepo(user);
        var eventid = req.params.eventid;
        if (!eventid) {
            res.json(400, err_handler.wrapForResponse(400, 'Specify event id.'));
            return;
        }
        var locid = req.params.locid;
        if (!locid) {
            res.json(400, err_handler.wrapForResponse(400, 'Specify location id.'));
            return;
        }
        domainRepo.removePloc(eventid, locid, function (err, result) {
            if (err) {
                res.json(400, err_handler.wrapForResponse(400, 'Error processing request.', err));
                return;
            }
            console.log('RESULT: ' + result);
            res.json(200, result);
        });
    });

    var returnCollection = function (res, err, coll) {
        if (err) {
            res.json(500, err);
            return;
        }
        if (!coll || typeof(coll) === 'undefined') {
            res.json(204, err_handler.wrapForResponse(204, 'No results.'));
            return;
        }
        if (coll.length == 0) {
            res.json(204, err_handler.wrapForResponse(204, 'No results.'));
            return;
        }
        if (coll) {
            res.send(200, coll);
        }
    };
    var returnSingle = function (res, err, item) {
        if (err) {
            res.json(500, err_handler.wrapForResponse(500, 'Error executing query.', err));
            return;
        }
        if (!item || typeof(item) == 'undefined') {
            res.json(204, err_handler.wrapForResponse(204, 'No results.'));
            return;
        }
        if (item) {
            res.send(200, item);
        }
    };

    /*
     app.post(singleUri + '/', function (req, res) {
     Event.AddFromObject(req.body, req.user, function (err, result) {
     if (err) {
     res.send(500, { error: err });
     return;
     }
     res.send(200, result);
     });
     });

     app.put(singleUri + '/', function (req, res) {
     Event.UpdateFromObject(req.body, req.user, function (err, result) {
     if (err) {
     res.send(401, { error: err })
     }
     res.send(200, result);
     })
     });

     app.put(singleUri + '/:id', function (req, res) {
     Event.UpdateFromObject(req.body, req.user, function (err, result) {
     if (err) {
     res.send(401, { error: err })
     }
     res.send(200, result);
     })
     });

     app.delete(singleUri + '/:id', function (req, res) {
     Event.DeleteById(req.params.id, req.user, function (err, event) {
     if (err) {
     res.send(401, { error: err })
     }
     res.send(200, event);
     })
     });

     app.get(uriBase + '/seed/:count', auth.ensureAuthenticated, function (req, res) {

     var numOfElements = req.params.count;

     if (req.query.clean == 'true') {
     Event.remove({}, function () {
     CreateElements(numOfElements, function (coll) {
     Event.create(coll, function (err, created) {
     if (err) {
     res.send(400, err);
     } else {
     res.send(200, coll.length + ' documents created.');
     }
     });
     });
     });
     } else {
     CreateElements(numOfElements, function (coll) {
     Event.create(coll, function (err, created) {
     if (err) {
     res.send(400, err);
     } else {
     res.send(200, coll.length + ' documents created.');
     }
     });
     });
     }
     });

     app.search(singleUri + '/meta', function (req, res) {

     var EventSchema = require('mongoose').model('Event').schema; // require('./bog.data.models.audit.js');
     res.send(200, { model_definition: EventSchema, model: new Event() });
     });

     function CreateElements(num, callback) {
     var coll = [];
     for (var i = 0; i < num; i++) {
     (function (i) {
     Event.createSeed(true, function (d) {
     d.title = 'Sample Event ' + i;
     coll.push(d);

     if (coll.length == num) {
     callback(coll);
     }
     });
     }(i));
     }
     }
     */

};