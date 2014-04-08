var _base = require('./bog.domain.repositories._base.js');
var DonationTypeData = require('../../data/repositories/bog.data.repositories.donation.type');

var DonationTypeRepository = function (current_user) {
    var self = this;
    var user = current_user;
    var data = new DonationTypeData();

    // Return All Items
    var All = function (callback) {
        data.all(function (err, coll) {
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

DonationTypeRepository.prototype = new _base();

module.exports = DonationTypeRepository;