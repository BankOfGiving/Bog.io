var _base = require('./bog.data.repositories._base');
var StatusModel = require('../models/bog.data.models.status');

StatusRepository = function () {

    var All = function (callback) {
        var loc_root = 'data.lookup.statuses.';
        // TODO: Localize 'name' and 'description'
        var typesCollection = [];
        var privateStatus = new StatusModel();
        privateStatus.value = 'private';
        privateStatus.key = loc_root + 'private';
        privateStatus.name = 'Private';
        privateStatus.description = 'Won’t appear in search results and will be invisible to other users.';
        typesCollection.push(privateStatus);
        var unlistedStatus = new StatusModel();
        unlistedStatus.value = 'unlisted';
        unlistedStatus.key = loc_root + 'unlisted';
        unlistedStatus.name = 'Unlisted';
        unlistedStatus.description = 'Won’t appear in search results but is visible to any user with the direct link.';
        typesCollection.push(unlistedStatus);
        var publicStatus = new StatusModel();
        publicStatus.value = 'public';
        publicStatus.key = loc_root + 'public';
        publicStatus.name = 'Public';
        publicStatus.description = 'Will appear in search results and is visible to all users.';
        typesCollection.push(publicStatus);
        callback(null, typesCollection);
    };

    return {
        all: All
    };
};

StatusRepository.prototype = new _base();

module.exports = StatusRepository;