module.exports = function (app, uriBase) {
    // modules
    var Event = require('.././event.model.js');
    var auth = require('../../modules/bog.auth.js');

    // Collection Routes
    var collectionUri = uriBase + '/events';

    // CORS
    app.all(collectionUri + '/*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    app.get(collectionUri + '/', function (req, res) {
        var params = req.params;
        Event.getAllSimpleFiltered(params, function (err, collection) {
            if (err) {
                res.send(500, err);
                return;
            }
            if (!collection || collection == null || typeof(collection) == 'undefined') {
                res.send(204, 'No results.');
                return;
            }
            if (collection.length == 0) {
                res.send(204, 'No results.');
                return;
            }
            if (collection) {
                res.send(200, collection);
                return;
            }
        });
    });
    app.post(collectionUri + '/', function (req, res) {
        var params = req.event;
        Event.getAllSimpleFiltered(params, function (err, collection) {
            if (err) {
                res.send(500, err);
            }
            if (!err && collection == null) {
                res.send(204, 'No results.');
            }
            if (!err && collection.length == 0) {
                res.send(204, 'No results.');
            }
            if (!err && collection) {
                res.send(200, collection);
            }
        });
    });


    // Model Routes
    var singleUri = uriBase + '/event';

    // CORS
    app.all(singleUri + '/*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    app.get(singleUri + '/:id', function (req, res) {
        var id = req.param('id');
        Event.getExtendedById(id, function (err, results) {
            if (err) {
                res.send(500, { error: err });
                return;
            }
            if (!err && !results) {
                res.send(204);
                return;
            }
            console.log(JSON.stringify(results));
            res.send(200, results);
        });
    });

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

};