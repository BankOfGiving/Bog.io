module.exports = function(app, uriBase){
    var connectTimeout = require('connect-timeout');
    // modules
    var Event = require('../../models/event.model.js');

    // globals
    uriBase = uriBase + '/events';

    // CORS
    app.all(uriBase + '*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    // routes
    app.get(uriBase + '/', function(req, res){
        var query = Event.find();
        query.exec(function (err, coll) {
            if(err) {
                res.send(err);
            }
            if(coll.length == 0)
            {
                var event = new Event();
                event.title = "Sample Event";

                res.send(event);
            }
            if(coll == null)
            {
                res.send('no data');
            }
            if(coll.length > 0)
            {
                res.send(coll);
            }
        });
    });

    app.get(uriBase + '/:objectId', function(req, res){
        var id = req.param('objectId');
        Event.getByObjectId(id, function (err, results){
            if(err) {
                res.send(err);
            }
            if(results == null)
            {
                res.send('no data');
            }else{
                res.send(results);
            }
        });
    });

    app.get(uriBase + '/bylocation', function(req, res){
        var address = req.query.addr;
        var radius = req.query.rad;
        Event.getByLocation(address, radius, function(err, coll){
            if(err) {
                res.send(coll, 500, err);
            }else{
                res.send(coll, 200);
            }
        });
    });

    app.get(uriBase + '/seed/:count', function(req, res){

        var numOfElements = req.params.count;

        if(req.query.clean == 'true')
        {
           Event.remove({}, function() {
               CreateElements(numOfElements, function(coll){
                   Event.create(coll, function(err, created){
                       if(err) {
                           res.send(400, err);
                       } else {
                           res.send(200, coll.length + ' documents created.');
                       }
                   });
               });
            });
        } else {
            CreateElements(numOfElements, function(coll){
                Event.create(coll, function(err, created){
                    if(err) {
                        res.send(400, err);
                    } else {
                        res.send(200, coll.length + ' documents created.');
                    }
                });
            });
        }
    });

    function CreateElements(num, callback){
        var coll = [];
        for(var i = 0; i < num; i++) {
            (function(i){
                Event.createSeed(true, function (d){
                    d.title = 'Sample Event ' + i;
                    coll.push(d);

                    if(coll.length == num) {
                        callback(coll);
                    }
                });
            }(i));
        }
    }
};