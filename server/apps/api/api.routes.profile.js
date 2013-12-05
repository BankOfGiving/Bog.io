/**
 * Created by dbaxter on 12/2/13.
 */
module.exports = function(app, uriBase){
    // globals
    uriBase = uriBase + '/profile';

    // modules
    var User = require('../../models/user.model');

    // CORS
    app.all(uriBase + '*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    app.get(uriBase + '/', ensureAuthenticated, function(req, res){
        res.send(200, { user: req.user });
    });
    app.post(uriBase + '/', ensureAuthenticated, function(req, res){
        console.log(req.get('user'));
        var profile = req.user;
        //if(contextUser._id = profile._id) {
            console.log('save profile: ' + profile);
            User.UpdateFromObject(profile, function(err, numberAffected, raw){
                if(err){
                    res.send(406, { err: req.err });
                }
                res.send(200, raw);
            });
//        } else {
//            res.send(406);
//        }
    });

    app.get(uriBase + '/checkuser', function(req, res){
        if(req.user == null){
            res.send(401, { user: null });
        }else{
            res.send(200, { user: req.user });
        }
    });

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.send(401)
    }
};