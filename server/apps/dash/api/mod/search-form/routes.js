module.exports = function (app, mod_uri) {
    var url = require('url');

    // modules
    var EventRepo = require('../../../../../domain/repositories/bog.domain.repositories.event.js');
    var EventTypeRepo = require('../../../../../domain/repositories/bog.domain.repositories.event.type.js');
    var ErrorHandler = require('../../../../../bog/bog.errors.js');

    var err_handler = new ErrorHandler();

    app.get(mod_uri + '/:uid?', function (req, res) {
        switch (req.params.uid) {
            case "":
                // Add logic for special search forms.
                break;
            default:
                default_viewdata(req, res);
                break;
        }
    });
    app.post(mod_uri + '/:uid?', function (req, res) {
        switch (req.params.uid) {
            case "":
                // Add logic for special search forms.
                break;
            default:
                search_all(req, res);
                break;
        }
    });

    var default_viewdata = function (req, res) {
        var view_data = {};
        var typesRepo = new EventTypeRepo();
        typesRepo.all(function (err, coll) {
            if (err) {
                res.json(err_handler.wrap(5004));
            } else {
                view_data.search_types = coll;
                res.json(view_data);
            }
        });
    };
    var search_all = function (req, res) {
        var user = req.user;
        var domainRepo = new EventRepo(user);
        var depth = 3;
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
    var return_results = function (res, err, coll) {
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
    };

    // Internationalization
    require('../../../../api.i18n.routes')(app, mod_uri);
};