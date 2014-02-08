module.exports = function () {
    var ensureAuthenticated = function (req, res, next) {
        console.log(JSON.stringify(req.session.passport));
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.send(401);
        }
    }
};