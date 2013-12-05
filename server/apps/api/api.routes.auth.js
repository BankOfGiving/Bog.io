/**
 * Created by dbaxter on 12/2/13.
 */
module.exports = function(app, uriBase){
    // globals
    uriBase = uriBase + '/auth';

    // CORS
    app.all(uriBase + '*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    app.get(uriBase + '/loggedin', ensureAuthenticated, function(req, res){
        res.send(200);
    });

    app.get(uriBase + '/logout', ensureAuthenticated, function(req, res){
        req.logout();
        res.send(200);
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