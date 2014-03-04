Authorization = function () {
    var userCanPerform = function (user, object, action, callback) {
        if (1 === 0) {
            callback(false);
        } else {
            callback(true);
        }
    };

    return {
        userCanPerform: userCanPerform
    };
};

module.exports = Authorization;