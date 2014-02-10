var _base = require('./bog.domain.repositories._base.js');
var LocationData = require('../../data/repositories/bog.data.repositories.location.physical');
var LocationEntity = require('../../data/models/bog.data.models.location.physical');
var LocationModelList = require('../models/bog.domain.models.location.physical.list');
var LocationModelSimple = require('../models/bog.domain.models.location.physical.simple');
var LocationModelDetail = require('../models/bog.domain.models.location.physical.detail');

var PhysicalLocationRepository = function (current_user) {
    var self = this;
    var data = new LocationData();

    var depth_enum = ['list', 'simple', 'detail', 'raw'];

    // Return All Items
    var All = function (depth, callback) {
        depth = parseDepth(depth);
        if (depth == -1) {
            callback(self.err.wrap(400, 'Invalid depth.'));
            return;
        }

        switch (depth) {
            case 0:
                AllAsList(function (err, coll) {
                    callback(err, coll);
                });
                return;
            case 1:
                AllAsSimple(function (err, coll) {
                    callback(err, coll);
                });
                return;
            case 2:
                AllAsDetail(function (err, coll) {
                    callback(err, coll);
                });
                return;
            case 3:
                AllAsRaw(function (err, coll) {
                    callback(err, coll);
                });
                return;
            default:
                callback(self.err.wrap(400, 'Invalid procedure call'));
                return;
        }
    };
    var AllAsList = function (callback) {
        self.authorization.userCanPerform(null, LocationEntity, 'AllAsList', function (hasAuth) {
            if (!hasAuth) {
                callback('User is not authorized', null);
            }
            try {
                data.all(function (err, coll) {
                    if (err) {
                        callback(err, null);
                    } else {
                        var returnList = [];
                        pushRawCollectionToList(coll, function (listColl) {
                            returnList = listColl;
                        });
                        callback(null, returnList);
                    }
                });
            } catch (err) {
                callback(err, null);
            }
        });
    };
    var AllAsSimple = function (callback) {
        self.authorization.userCanPerform(null, LocationEntity, 'AllAsSimple', function (hasAuth) {
            if (!hasAuth) {
                callback('User is not authorized', null);
            }
            try {
                data.all(function (err, coll) {
                    if (err) {
                        callback(err, null);
                    } else {
                        var returnList = [];
                        pushRawCollectionToSimple(coll, function (listColl) {
                            returnList = listColl;
                        });
                        callback(null, returnList);
                    }
                });
            } catch (err) {
                callback(err, null);
            }
        });
    };
    var AllAsDetail = function (callback) {
        self.authorization.userCanPerform(null, LocationEntity, 'AllAsDetail', function (hasAuth) {
            if (!hasAuth) {
                callback('User is not authorized', null);
            }
            data.all(function (err, coll) {
                if (err) {
                    callback(err, null);
                } else {
                    var returnList = [];
                    pushRawCollectionToDetail(coll, function (listColl) {
                        returnList = listColl;
                    });
                    callback(null, returnList);
                }
            });
        });
    };
    var AllAsRaw = function (callback) { // callback (errors, collection)
        self.authorization.userCanPerform(null, LocationEntity, 'AllAsRaw', function (hasAuth) {
            if (!hasAuth) {
                callback('User is not authorized', null);
            }
            data.all(function (err, coll) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, coll);
                }
            });
        });
    };

    // Return Filtered List
    var Filtered = function (filter, depth, callback) {
        depth = parseDepth(depth);
        if (depth == -1) {
            callback(self.err.wrap(400, 'Invalid depth.'));
            return;
        }

        switch (depth) {
            case 0:
                FilteredAsList(filter, function (err, coll) {
                    callback(err, coll);
                });
                return;
            case 1:
                FilteredAsSimple(filter, function (err, coll) {
                    callback(err, coll);
                });
                return;
            case 2:
                FilteredAsDetail(filter, function (err, coll) {
                    callback(err, coll);
                });
                return;
            case 3:
                FilteredAsRaw(filter, function (err, coll) {
                    callback(err, coll);
                });
                return;
            default:
                callback(self.err.wrap(400, 'Invalid procedure call'));
                return;
        }
    };
    var FilteredAsList = function (filter, callback) {
        self.authorization.userCanPerform(null, LocationEntity, 'FilteredAsList', function (hasAuth) {
            if (!hasAuth) {
                callback('User is not authorized', null);
            }
            try {
                data.find(filter, function (err, coll) {
                    if (err) {
                        callback(err, null);
                    } else {
                        var returnList = [];
                        pushRawCollectionToList(coll, function (listColl) {
                            returnList = listColl;
                        });
                        callback(null, returnList);
                    }
                });
            } catch (err) {
                callback(err, null);
            }
        });
    };
    var FilteredAsSimple = function (filter, callback) {
        self.authorization.userCanPerform(null, LocationEntity, 'FilteredAsSimple', function (hasAuth) {
            if (!hasAuth) {
                callback('User is not authorized', null);
            }
            data.find(filter, function (err, coll) {
                if (err) {
                    callback(err, null);
                } else {
                    var returnList = [];
                    pushRawCollectionToSimple(coll, function (listColl) {
                        returnList = listColl;
                    });
                    callback(null, returnList);
                }
            });
        });
    };
    var FilteredAsDetail = function (filter, callback) {
        self.authorization.userCanPerform(null, LocationEntity, 'FilteredAsDetail', function (hasAuth) {
            if (!hasAuth) {
                callback('User is not authorized', null);
            }
            data.find(filter, function (err, coll) {
                if (err) {
                    callback(err, null);
                } else {
                    var returnList = [];
                    pushRawCollectionToDetail(coll, function (listColl) {
                        returnList = listColl;
                    });
                    callback(null, returnList);
                }
            });
        });
    };
    var FilteredAsRaw = function (filter, callback) {
        self.authorization.userCanPerform(null, LocationEntity, 'FilteredAsRaw', function (hasAuth) {
            if (!hasAuth) {
                callback('User is not authorized', null);
            }
            data.find(filter, function (err, coll) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, coll);
                }
            });
        });
    };

    // Return Single
    var ById = function (id, depth, callback) {

        depth = parseDepth(depth);
        if (depth == -1) {
            callback(self.err.wrap(400, 'Invalid depth.'));
            return;
        }
        switch (depth) {
            case 0:
                ByIdAsList(id, function (err, item) {
                    callback(err, item);
                });
                return;
            case 1:
                ByIdAsSimple(id, function (err, item) {
                    callback(err, item);
                });
                return;
            case 2:
                ByIdAsDetail(id, function (err, item) {
                    callback(err, item);
                });
                return;
            case 3:
                ByIdAsRaw(id, function (err, item) {
                    callback(err, item);
                });
                return;
            default:
                callback(self.err.wrap(400, 'Invalid procedure call'));
                return;
        }
    };
    var ByIdAsList = function (id, callback) {
        data.findById(id, function (err, raw_item) {
            self.authorization.userCanPerform(current_user, raw_item, 'ByIdAsList', function (hasAuth) {
                if (!hasAuth) {
                    callback('User is not authorized', null);
                }
                if (err) {
                    callback(err, null);
                } else {
                    var returnItem = {};
                    pushRawSingleToList(raw_item, function (err, parsed_item) {
                        returnItem = parsed_item;
                    });
                    callback(null, returnItem);
                }
            });
        });
    };
    var ByIdAsSimple = function (id, callback) {
        data.findById(id, function (err, rawItem) {
            self.authorization.userCanPerform(current_user, rawItem, 'ByIdAsSimple', function (hasAuth) {
                if (!hasAuth) {
                    callback('User is not authorized', null);
                    return;
                }
                if (err) {
                    callback(err, null);
                } else {
                    var returnItem = {};
                    pushRawSingleToSimple(rawItem, function (err, parsed_item) {
                        returnItem = parsed_item;
                    });
                    callback(null, returnItem);
                }
            });
        });
    };
    var ByIdAsDetail = function (id, callback) {
        data.findById(id, function (err, found_item) {
            self.authorization.userCanPerform(current_user, LocationEntity, 'ByIdAsDetail', function (hasAuth) {
                if (!hasAuth) {
                    callback('User is not authorized', null);
                    return;
                }
                if (err) {
                    callback(err, null);
                } else {
                    var returnItem = {};
                    pushRawSingleToDetail(found_item, function (err, parsed_item) {
                        returnItem = parsed_item;
                    });
                    callback(null, returnItem);
                }
            });
        });
    };
    var ByIdAsRaw = function (id, callback) {
        data.findById(id, function (err, item) {
            self.authorization.userCanPerform(current_user, LocationEntity, 'ByIdAsRaw', function (hasAuth) {
                if (!hasAuth) {
                    callback('User is not authorized', null);
                    return;
                }
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, item);
                }
            });
        });
    };

    // Add / Edit
    var Add = function (input, callback) {
        if (!input) {
            callback('Invalid Model', null);
            return;
        }
        // if (!current_user) { callback('User required to add new records.', null); return; }
        if (input instanceof Array) {
            callback('Multiple address addition is not yet supported.', null);
        }
        self.authorization.userCanPerform(current_user, LocationEntity, 'Add', function (hasAuth) {
            if (!hasAuth) {
                callback('User is not authorized', null);
                return;
            }

            var entity = new LocationEntity();
            parseAndValidate(input, entity, function (err, populated_entity) {
                if (err) {
                    callback(err, false);
                } else {
                    callback(null, populated_entity);
//                    data.add(populated_entity, function(err, saved_entity){
//                        if(err){
//                            callback(err, null);
//                        } else {
//                            //AddAuditEntry(saved_entity, 'Update', current_user);
//                            callback(null, saved_entity);
//                        }
//                    });
                }
            });
        });
    };
    var Update = function (id, input, callback) {  // callback(err, id)
        if (!input) {
            callback('Invalid input.', false);
        }
        // if (!current_user) { callback('User required to update records.', null); return; }
        if (input instanceof Array) {
            callback('Multiple address addition is not yet supported.', null);
            return;
        }
        if (!id) {
            callback('Invalid id.', null);
            return;
        }

        self.authorization.userCanPerform(current_user, LocationEntity, 'Update', function (hasAuth) {
            if (!hasAuth) {
                callback('User is not authorized', null);
            }

            data.findById(id, function (err, entity) {
                if (err) {
                    callback(err, false);
                    return;
                }
                if (!entity || entity == {}) {
                    callback('No entity found matching criteria.', null);
                } else {
                    parseAndValidate(input, entity, function (err, populated_entity) {
                        if (err) {
                            callback(err, null);
                        } else {
                            data.update(id, populated_entity, function (err, saved_entity) {
                                if (err) {
                                    callback(err, null);
                                } else {
                                    //AddAuditEntry(saved_entity, 'Update', current_user);
                                    callback(null, saved_entity);
                                }
                            });
                        }
                    });
                }
            });
        });
    };
    var DeleteById = function (id, callback) {
        if (!id) {
            callback('Invalid id.', null);
        }
        //if (!current_user) { callback('Invalid user.', false); }

        self.authorization.userCanPerform(current_user, LocationEntity, 'DeleteById', function (hasAuth) {
            if (!hasAuth) {
                callback('User is not authorized', null);
            }

            data.findById(id, function (err, populated_entity) {
                if (err) {
                    callback(err, false);
                } else {
                    data.delete(populated_entity, function (err, saved_entity) {
                        if (err) {
                            callback(err, null);
                        } else {
                            //AddAuditEntry(saved_entity, 'Delete', current_user);
                            callback(null, saved_entity);
                        }
                    });
                }
            });
        });
    };


    var parse = function (input, entity, callback) {
        // Mapping
        var changes = []; // property, old, new
        if (input.street) {
            if (entity.street != input.street) {
                entity.street = input.street;
                changes.push(['street', entity.street, input.street]);
            }
        }
        if (input.city) {
            if (entity.city != input.city) {
                entity.city = input.city;
                changes.push(['city', entity.city, input.city]);
            }
        }
        if (input.state) {
            if (entity.state != input.state) {
                entity.state = input.state;
                changes.push(['state', entity.state, input.state]);
            }
        }
        if (input.postal_code) {
            if (entity.postal_code != input.postal_code) {
                entity.postal_code = input.postal_code;
                changes.push(['postal_code', entity.postal_code, input.postal_code]);
            }
        }
        if (input.country) {
            if (entity.country != input.country) {
                entity.country = input.country;
                changes.push(['country', entity.country, input.country]);
            }
        }
        if (input.primary) {
            if (entity.primary != input.primary) {
                entity.primary = input.primary;
                changes.push(['primary', entity.primary, input.primary]);
            }
        }

        callback(null, entity, changes);
    };

    var validate = function (entity, callback) {
        console.log('TODO: Add domain logic for: location_physical');
        callback(null, entity);
    };

    var parseAndValidate = function (input, entity, callback) {
        parse(input, entity, function (err, parsed_entity, changes) {
            if (err) {
                callback(err, entity);
            } else {
                validate(parsed_entity, function (err, validated_entity) {
                    if (err) {
                        callback(err);
                    } else {
                        verify(validated_entity, function (err, verified, geocode) {
                            validated_entity.verified = verified;
                            if (verified) {
                                validated_entity.geocoding_result = geocode;
                                validated_entity.latitude = geocode.geometry.location.lat;
                                validated_entity.longitude = geocode.geometry.location.lng;
                                validated_entity.geospacial_index.coordinates = [geocode.geometry.location.lng, geocode.geometry.location.lat];
                            }
                            callback(err, validated_entity, changes);
                        });
                    }
                });
            }
        });
    };

    var verify = function (location, callback) { //callback(err, verified, result)
        var GeoCoding = require('../../modules/bog.geocoding');
        var geo = new GeoCoding();

        serializeAddress(location, function (serialized_location) {
            geo.code(serialized_location, function (geocode) {
                if (geocode.results.length === 0) {
                    callback(self.err.wrap(400, 'Address Verification failed.  No match found.'), false);
                    return;
                }
                if (geocode.results.length > 1) {
                    callback(self.err.wrap(400, 'Address Verification failed.  Multiple results found.'), false);
                    return;
                }
                if (geocode.status != 'OK') {
                    callback(self.err.wrap(400, 'Address Verification failed.  Invalid return staus: ' + geocode.status), false);
                    console.log("status:  " + geocode.status);
                    return;
                }
                if (geocode.results[0].partial_match === true) {
                    callback(self.err.wrap(400, 'Address Verification failed.  Only partial matches found.'), false);
                    return;
                }
                if (geocode.results.length == 1) {
                    callback(null, true, geocode.results[0]);
                }
            });
        });
    };

    var serializeAddress = function (loc, callback) {
        callback(loc.street + ' ' + loc.city + ' ' + loc.state + ' ' + loc.country);
    };

    var parseDepth = function (depth) {
        if (isNaN(depth)) {
            if (depth_enum.indexOf(depth) === -1) {
                return -1;
            } else {
                return depth_enum.indexOf(depth);
            }
        } else {
            if (depth < 0 || depth > depth_enum.length - 1) {
                return -1;
            } else {
                return Number(depth);
            }
        }
    };

    // Mapping functions
    var pushRawCollectionToList = function (collection, callback) {
        var newColl = [];
        for (var i = 0; i < collection.length; i++) {
            var rawItem = collection[i];
            var listModel = new LocationModelList().fromRaw(rawItem);
            newColl.push(listModel);
        }
        callback(newColl);
    };
    var pushRawCollectionToSimple = function (collection, callback) {
        var newColl = [];
        for (var i = 0; i < collection.length; i++) {
            var rawItem = collection[i];
            var simpleModel = new LocationModelSimple().fromRaw(rawItem);
            newColl.push(simpleModel);
        }
        callback(newColl);
    };
    var pushRawCollectionToDetail = function (collection, callback) {
        var newColl = [];
        for (var i = 0; i < collection.length; i++) {
            var rawItem = collection[i];
            var detailModel = new LocationModelDetail().fromRaw(rawItem);
            newColl.push(detailModel);

            // Perform Mapping
            newColl.push(detailModel);
        }
        callback(newColl);
    };

    var pushRawSingleToList = function (rawItem, callback) {
        var listModel = new LocationModelList().fromRaw(rawItem);
        callback(null, listModel);
    };
    var pushRawSingleToSimple = function (rawItem, callback) {
        var simpleModel = new LocationModelSimple().fromRaw(rawItem);
        callback(null, simpleModel);
    };
    var pushRawSingleToDetail = function (rawItem, callback) {
        var detailModel = new LocationModelDetail().fromRaw(rawItem);
        callback(null, detailModel);
    };

    return {
        all: All,
        filtered: Filtered,
        byId: ById,

        allAsList: AllAsList,
        allAsSimple: AllAsSimple,
        allAsDetail: AllAsDetail,
        allAsRaw: AllAsRaw,

        filteredAsList: FilteredAsList,
        filteredAsSimple: FilteredAsSimple,
        filteredAsDetail: FilteredAsDetail,
        filteredAsRaw: FilteredAsRaw,

        byIdAsList: ByIdAsList,
        byIdAsSimple: ByIdAsSimple,
        byIdAsDetail: ByIdAsDetail,
        byIdAsRaw: ByIdAsRaw,

        // Manage Event
        add: Add,
        update: Update,
        delete: DeleteById
    };
};

PhysicalLocationRepository.prototype = new _base();

module.exports = PhysicalLocationRepository;