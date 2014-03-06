module.exports = function () {
    var ensureAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.send(401);
        }
    };
};