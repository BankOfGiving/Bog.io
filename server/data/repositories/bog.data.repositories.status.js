var _base = require('./bog.data.repositories._base');
var EventStatusModel = require('../models/bog.data.models.status');

EventStatusRepository = function () {

    var All = function (callback) {
        // TODO: Localize 'name' and 'description'
        var typesCollection = [];
        var privateStatus = new EventStatusModel();
        privateStatus.value = 'private';
        privateStatus.name = 'Private';
        privateStatus.description = 'Won’t appear in search results and will be invisible to other users.';
        typesCollection.push(privateStatus);
        var unlistedStatus = new EventStatusModel();
        unlistedStatus.value = 'unlisted';
        unlistedStatus.name = 'Unlisted';
        unlistedStatus.description = 'Won’t appear in search results but is visible to any user with the direct link.';
        typesCollection.push(unlistedStatus);
        var publicStatus = new EventStatusModel();
        publicStatus.value = 'public';
        publicStatus.name = 'Public';
        publicStatus.description = 'Will appear in search results and isa visible to all users.';
        typesCollection.push(publicStatus);
        callback(null, typesCollection);
    };

    return {
        all: All
    };
};

EventStatusRepository.prototype = new _base();

module.exports = EventStatusRepository;