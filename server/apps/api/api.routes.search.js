
module.exports = function(app, uriBase){
    // modules
    var Donation = require('../../models/donation.model.js');

    // globals
    uriBase = uriBase + '/search';

    // CORS
    app.all(uriBase + '*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    // routes
    app.get(uriBase + '/all/', function(req, res){
        var query = Donation.find();
        query.exec(function (err, coll) {
            if(err) {
                res.send(400, err);
            }
            if(coll == null)
            {
                res.send(204, 'no data');
            }
            if(coll.length == 0)
            {
                res.send(204, 'no results');
            }
            if(coll.length > 0)
            {
                res.send(200, coll);
            }
        });
    });

    app.get(uriBase + '/all/bylocation', function(req, res){
        var lat = req.query.lat;
        var lng = req.query.lng;
        var rad = req.query.rad;
        Donation.getByLocation(lat, lng, rad, function(err, coll){
            if(err)
            {
                res.send(coll, 500, err);
            }else{
                // Disable caching for content files
                res.header("Cache-Control", "no-cache, no-store, must-revalidate");
                res.header("Pragma", "no-cache");
                res.header("Expires", 0);
                res.send(coll, 200);
            }
        });
    });
};