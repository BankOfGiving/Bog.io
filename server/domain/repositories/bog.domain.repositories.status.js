var _base = require('./bog.domain.repositories._base.js');
var StatusDataRepo = require('../../data/repositories/bog.data.repositories.status');

var StatusRepository = function (current_user) {
    var self = this;
    var user = current_user;


    // Return All Items
    var All = function (callback) {
        var dataRepo = new StatusDataRepo();

        dataRepo.all(function (err, coll) {
            if (err) {
                callback(self.err.wrap(1001, null, err));
            } else {
                callback(null, coll);
            }
        });
    };

    return {
        all: All
    };
};

StatusRepository.prototype = new _base();

module.exports = StatusRepository;