var _base = require('./bog.domain.repositories._base.js');
var EventTypeData = require('../../data/repositories/bog.data.repositories.event.type');

var EventTypeRepository = function (current_user) {
    var self = this;
    var user = current_user;
    var data = new EventTypeData();

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

EventTypeRepository.prototype = new _base();

module.exports = EventTypeRepository;