var _base = require('./bog.domain.repositories._base.js');
var EventData = require('../../data/repositories/bog.data.repositories.event');
var PhysicalLocaitonDomain = require('../../domain/repositories/bog.domain.repositories.location.physical');
var EventEntity = require('../../data/models/bog.data.models.event');
var AuditEntity = require('../../data/models/bog.data.models.audit');
var EventModelList = require('../models/bog.domain.models.event.list');
var EventModelSimple = require('../models/bog.domain.models.event.simple');
var EventModelDetail = require('../models/bog.domain.models.event.detail');

var EventRepository = function (current_user) {
    var self = this;
    var data = new EventData();
    var plocDomain = new PhysicalLocaitonDomain();

    var depth_enum = ['list', 'simple', 'detail', 'raw'];

    // Return All Items
    var All = function (depth, callback) {
        depth = parseDepth(depth);
        if (depth == -1) {
            callback(self.err.wrap(2002));
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
                callback(self.err.wrap(1000));
                return;
        }
    };
    var AllAsList = function (callback) {
        self.authorization.userCanPerform(null, EventEntity, 'AllAsList', function (hasAuth) {
            if (!hasAuth) {
                callback(self.err.wrap(4000));
                return;
            }
            data.all(function (err, coll) {
                if (err) {
                    callback(self.err.wrap(1001, null, err));
                } else {
                    var returnList = [];
                    pushRawCollectionToList(coll, function (listColl) {
                        returnList = listColl;
                    });
                    callback(null, returnList);
                }
            });
        });
    };
    var AllAsSimple = function (callback) {
        self.authorization.userCanPerform(null, EventEntity, 'AllAsSimple', function (hasAuth) {
            if (!hasAuth) {
                callback(self.err.wrap(4000));
                return;
            }
            try {
                data.all(function (err, coll) {
                    if (err) {
                        callback(self.err.wrap(1001, null, err));
                    } else {
                        var returnList = [];
                        pushRawCollectionToSimple(coll, function (listColl) {
                            returnList = listColl;
                        });
                        callback(null, returnList);
                    }
                });
            } catch (err) {
                callback(self.err.wrap(1001, null, err));
            }
        });
    };
    var AllAsDetail = function (callback) {
        self.authorization.userCanPerform(null, EventEntity, 'AllAsDetail', function (hasAuth) {
            if (!hasAuth) {
                callback(self.err.wrap(4000));
                return;
            }
            data.all(function (err, coll) {
                if (err) {
                    callback(self.err.wrap(1001, null, err));
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
        self.authorization.userCanPerform(null, EventEntity, 'AllAsRaw', function (hasAuth) {
            if (!hasAuth) {
                callback(self.err.wrap(4000));
                return;
            }
            data.all(function (err, coll) {
                if (err) {
                    callback(self.err.wrap(1001, null, err));
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
            callback(self.err.wrap(5003));
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
                callback(self.err.wrap(1000));
                return;
        }
    };
    var FilteredAsList = function (filter, callback) {
        self.authorization.userCanPerform(null, EventEntity, 'FilteredAsList', function (hasAuth) {
            if (!hasAuth) {
                callback(self.err.wrap(4000));
                return;
            }

            data.find(filter, function (err, coll) {
                if (err) {
                    callback(self.err.wrap(1001, null, err));
                } else {
                    var returnList = [];
                    pushRawCollectionToList(coll, function (listColl) {
                        returnList = listColl;
                    });
                    callback(null, returnList);
                }
            });
        });
    };
    var FilteredAsSimple = function (filter, callback) {
        self.authorization.userCanPerform(null, EventEntity, 'FilteredAsSimple', function (hasAuth) {
            if (!hasAuth) {
                callback(self.err.wrap(4000));
                return;
            }
            data.find(filter, function (err, coll) {
                if (err) {
                    callback(self.err.wrap(1001, null, err));
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
        self.authorization.userCanPerform(null, EventEntity, 'FilteredAsDetail', function (hasAuth) {
            if (!hasAuth) {
                callback(self.err.wrap(4000));
                return;
            }
            data.find(filter, function (err, coll) {
                if (err) {
                    callback(self.err.wrap(1001, null, err));
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
        self.authorization.userCanPerform(null, EventEntity, 'FilteredAsRaw', function (hasAuth) {
            if (!hasAuth) {
                callback(self.err.wrap(4000));
                return;
            }
            data.find(filter, function (err, coll) {
                if (err) {
                    callback(self.err.wrap(1001, null, err));
                } else {
                    callback(null, coll);
                }
            });
        });
    };

    // Return Single
    var ById = function (id, depth, callback) {
        if (!isValidObjectID(id)) {
            callback(self.err.wrap(5001));
            return;
        }

        depth = parseDepth(depth);
        if (depth == -1) {
            callback(self.err.wrap(5003));
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
                callback(self.err.wrap(1000));
                return;
        }
    };
    var ByIdAsList = function (id, callback) {
        if (!isValidObjectID(id)) {
            callback(self.err.wrap(5001));
            return;
        }

        data.findById(id, function (err, entity) {
            if (err) {
                callback(self.err.wrap(1001, null, err));
                return;
            }
            if (!entity || entity == {}) {
                callback(self.err.wrap(5006));
            } else {
                self.authorization.userCanPerform(current_user, entity, 'ByIdAsSimple', function (hasAuth) {
                    if (!hasAuth) {
                        callback(self.err.wrap(4000));
                        return;
                    }

                    var returnItem = {};
                    pushRawSingleToList(entity, function (err, parsed_item) {
                        returnItem = parsed_item;
                    });
                    callback(null, returnItem);
                });
            }
        });
    };
    var ByIdAsSimple = function (id, callback) {
        if (!isValidObjectID(id)) {
            callback(self.err.wrap(5001));
            return;
        }

        data.findById(id, function (err, entity) {
            if (err) {
                callback(self.err.wrap(1001, null, err));
                return;
            }
            if (!entity || entity == {}) {
                callback(self.err.wrap(5006));
            } else {
                self.authorization.userCanPerform(current_user, entity, 'ByIdAsSimple', function (hasAuth) {
                    if (!hasAuth) {
                        callback(self.err.wrap(4000));
                        return;
                    }

                    var returnItem = {};
                    pushRawSingleToSimple(entity, function (err, parsed_item) {
                        returnItem = parsed_item;
                    });
                    callback(null, returnItem);
                });
            }
        });
    };
    var ByIdAsDetail = function (id, callback) {
        if (!isValidObjectID(id)) {
            callback(self.err.wrap(5001));
            return;
        }

        data.findById(id, function (err, entity) {
            if (err) {
                callback(self.err.wrap(1001, null, err));
                return;
            }
            if (!entity || entity == {}) {
                callback(self.err.wrap(5006));
            } else {
                self.authorization.userCanPerform(current_user, EventEntity, 'ByIdAsDetail', function (hasAuth) {
                    if (!hasAuth) {
                        callback(self.err.wrap(4000));
                        return;
                    }
                    var returnItem = {};
                    pushRawSingleToDetail(entity, function (err, parsed_item) {
                        returnItem = parsed_item;
                    });
                    callback(null, returnItem);
                });
            }
        });
    };
    var ByIdAsRaw = function (id, callback) {
        if (!isValidObjectID(id)) {
            callback(self.err.wrap(5001));
            return;
        }

        data.findById(id, function (err, entity) {
            if (err) {
                callback(self.err.wrap(1001, null, err));
                return;
            }
            if (!entity || entity == {}) {
                callback(self.err.wrap(5006));
            } else {
                self.authorization.userCanPerform(current_user, EventEntity, 'ByIdAsRaw', function (hasAuth) {
                    if (!hasAuth) {
                        callback(self.err.wrap(4000));
                        return;
                    }
                    if (err) {
                        callback(self.err.wrap(1001, null, err));
                    } else {
                        callback(null, entity);
                    }
                });
            }
        });
    };

    // Add / Edit
    var Add = function (input, callback) {
        self.authorization.userCanPerform(current_user, EventEntity, 'Add', function (hasAuth) {
            if (!hasAuth) {
                callback(self.err.wrap(4000));
                return;
            }

            var entity = new EventEntity();
            parseAndValidate(input, entity, function (err, populated_entity) {
                if (err) {
                    callback(self.err.wrap(1001, null, err));
                } else {
                    data.add(populated_entity, function (err, saved_entity) {
                        if (err) {
                            callback(self.err.wrap(1001, null, err));
                        } else {
                            AddAuditEntry(saved_entity, 'Update', current_user);
                            callback(null, saved_entity._id);
                        }
                    });
                }
            });
        });
    };
    var Update = function (id, input, callback) {  // callback(err, id)
        if (!isValidObjectID(id)) {
            callback(self.err.wrap(5001));
            return;
        }

        self.authorization.userCanPerform(current_user, EventEntity, 'Update', function (hasAuth) {
            if (!hasAuth) {
                callback(self.err.wrap(4000));
                return;
            }

            data.findById(id, function (err, entity) {
                if (err) {
                    callback(self.err.wrap(1001, null, err));
                    return;
                }
                if (!entity || entity == {}) {
                    callback(self.err.wrap(2010));
                } else {
                    parseAndValidate(input, entity, function (err, populated_entity, changes) {
                        if (err) {
                            callback(err);
                        } else {
                            data.update(id, populated_entity, function (err, saved_entity) {
                                if (err) {
                                    callback(err);
                                } else {
                                    AddAuditEntry(saved_entity, 'Add Physical Location', current_user, changes);
                                    callback(null, saved_entity._id);
                                }
                            });
                        }
                    });
                }
            });
        });
    };
    var Delete = function (input, callback) {
        if (!input.id || !input._id) {
            callback(self.err.wrap(5001));
            return;
        }
        var id = input.id;
        if (!id) {
            id = input._id
        }
        if (!isValidObjectID(id)) {
            callback(self.err.wrap(5001));
            return;
        }

        self.authorization.userCanPerform(current_user, EventEntity, 'DeleteById', function (hasAuth) {
            if (!hasAuth) {
                callback(self.err.wrap(4000));
                return;
            }
            data.findById(id, function (err, entity) {
                if (err) {
                    callback(self.err.wrap(1001, null, err));
                    return;
                }
                if (!entity || entity == {}) {
                    callback(self.err.wrap(5005));
                } else {
                    entity.status = 'deleted';
                    data.save(entity, function (err, saved_entity) {
                        if (err) {
                            callback(self.err.wrap(1001, null, err));
                        } else {
                            AddAuditEntry(saved_entity, 'Delete', current_user);
                            callback(null, saved_entity._id);
                        }
                    });
                }
            });
        });
    };

    var DeleteById = function (id, callback) {
        if (!isValidObjectID(id)) {
            callback(self.err.wrap(5001));
            return;
        }

        self.authorization.userCanPerform(current_user, EventEntity, 'DeleteById', function (hasAuth) {
            if (!hasAuth) {
                callback(self.err.wrap(4000));
                return;
            }

            data.findById(id, function (err, populated_entity) {
                if (err) {
                    callback(self.err.wrap(1001, null, err));
                    return;
                }
                if (!populated_entity || populated_entity == {}) {
                    callback(self.err.wrap(5005));
                } else {
                    populated_entity.status = 'deleted';
                    data.save(populated_entity, function (err, saved_entity) {
                        if (err) {
                            callback(self.err.wrap(1001, null, err));
                        } else {
                            AddAuditEntry(saved_entity, 'Delete', current_user);
                            callback(null, saved_entity._id);
                        }
                    });
                }
            });
        });
    };

    // Physical Locations
    var PhysicalLocationById = function (eventid, locid, depth, callback) {
        if (!isValidObjectID(eventid)) {
            callback(self.err.wrap(5001));
            return;
        }
        if (!isValidObjectID(locid)) {
            callback(self.err.wrap(5101));
            return;
        }

        self.authorization.userCanPerform(current_user, EventEntity, 'Location Get By Id', function (hasAuth) {
            if (!hasAuth) {
                callback(self.err.wrap(4000));
                return;
            }

            plocDomain.byId(locid, depth, function (err, event_ploc) {
                if (err) {
                    callback(self.err.wrap(1001, null, err));
                } else {
                    callback(null, event_ploc);
                }
            });
        });
    };
    var PhysicalLocationAdd = function (eventid, input, callback) {
        if (!isValidObjectID(eventid)) {
            callback(self.err.wrap(5001));
            return;
        }

        self.authorization.userCanPerform(current_user, EventEntity, 'Update', function (hasAuth) {
            if (!hasAuth) {
                callback(self.err.wrap(4000));
                return;
            }

            data.findById(eventid, function (err, event_entity) {
                var parent_event = event_entity;
                if (err) {
                    callback(self.err.wrap(1001, null, err));
                    return;
                }
                if (!event_entity || event_entity == {}) {
                    callback(self.err.wrap(5005));
                } else {
                    plocDomain.add(input, function (err, saved_ploc) {
                        if (err) {
                            callback(self.err.wrap(1001, null, err));
                        } else {
                            parent_event.locations_physical.push(saved_ploc);
                            data.update(eventid, parent_event, function (err, saved_entity) {
                                if (err) {
                                    callback(self.err.wrap(1001, null, err));
                                } else {
                                    AddAuditEntry(saved_entity, 'Update Physical Location', current_user);
                                    callback(null, saved_entity._id);
                                }
                            });
                        }
                    });
                }
            });
        });
    };
    var PhysicalLocationUpdate = function (eventid, locid, input, callback) {
        if (!isValidObjectID(eventid)) {
            callback(self.err.wrap(5001));
            return;
        }
        if (!isValidObjectID(locid)) {
            callback(self.err.wrap(5101));
            return;
        }

        self.authorization.userCanPerform(current_user, EventEntity, 'Update', function (hasAuth) {
            if (!hasAuth) {
                callback(self.err.wrap(4000));
                return;
            }

            plocDomain.update(locid, input, function (err, saved_ploc) {
                if (err) {
                    callback(self.err.wrap(1001, null, err));
                } else {
                    callback(null, saved_ploc._id);
                }
            });
        });
    };
    var PhysicalLocationRemove = function (eventid, locid, callback) {
        if (!isValidObjectID(eventid)) {
            callback(self.err.wrap(5001));
            return;
        }
        if (!isValidObjectID(locid)) {
            callback(self.err.wrap(5101));
            return;
        }

        self.authorization.userCanPerform(current_user, EventEntity, 'Update', function (hasAuth) {
            if (!hasAuth) {
                callback(self.err.wrap(4000));
                return;
            }

            data.findById(eventid, function (err, event_entity) {
                var parent_event = event_entity;
                if (err) {
                    callback(self.err.wrap(1001, null, err));
                    return;
                }
                if (!event_entity || event_entity == {}) {
                    callback(self.err.wrap(5005));
                } else {
                    plocDomain.delete(locid, function (err, saved_ploc) {
                        if (err) {
                            callback(self.err.wrap(1001, null, err));
                        } else {
                            parent_event.locations_physical.pop(saved_ploc);
                            data.update(eventid, parent_event, function (err, saved_entity) {
                                if (err) {
                                    callback(self.err.wrap(1001, null, err));
                                } else {
                                    AddAuditEntry(saved_entity, 'Remove Physical Location', current_user);
                                    callback(null, saved_entity._id);
                                }
                            });
                        }
                    });
                }
            });
        });
    };

    // Auditing
    var AddAuditEntry = function (entity, action, actor, changes) {
        var audit = new AuditEntity({
            entityType: 'Event',
            entityId: entity._id,
            action: action,
            actor: actor
        });

        if (changes) audit.changeList = changes;

        if (entity.audit == null) {
            entity.audit = {
                author: actor,
                createdAt: Date.now(),
                detail: []
            };
        } else {
            if (entity.audit.author == null) {
                entity.audit.author = actor;
            }
            if (entity.audit.createdAt == null) {
                entity.audit.createdAt = Date.now();
            }
        }
        entity.audit.lastModifiedAt = Date.now();
        entity.audit.detail.push(audit);

        entity.save(function (err) {
            if (err) console.log('AUDIT SAVE ERROR:' + err);

            return true;
        });
    };

    var parseAndValidate = function (input, entity, callback) {
        parse(input, entity, function (err, parsed_entity, changes) {
            if (err) {
                callback(err, entity, null);
            } else {
                validate(parsed_entity, function (err, validated_entity) {
                    callback(err, validated_entity, changes);
                })
            }
        });
    };

    var parse = function (input, entity, callback) {
        // Mapping
        var changes = []; // property, old, new
        if (input.title) {
            if (entity.title != input.title) {
                changes.push(['title', entity.title, input.title]);
                entity.title = input.title;
            }
        }
        if (input.description) {
            if (entity.description != input.description) {
                changes.push(['description', entity.description, input.description]);
                entity.description = input.description;
            }
        }
        if (input.type) {
            if (entity.type != input.type) {
                changes.push(['type', entity.type, input.type]);
                entity.type = input.type;
            }
        }
        if (input.beginAt) {
            if (entity.beginAt != input.beginAt) {
                changes.push(['beginAt', entity.beginAt, input.beginAt]);
                entity.beginAt = input.beginAt;
            }
        }
        if (input.endAt) {
            if (entity.endAt != input.endAt) {
                changes.push(['endAt', entity.endAt, input.endAt]);
                entity.endAt = input.endAt;
            }
        }
        if (input.status) {
            if (entity.status != input.status) {
                changes.push(['status', entity.status, input.status]);
                entity.status = input.status;
            }
        }
        if (input.tags) {
            if (entity.tags != input.tags) {
                changes.push(['tags', entity.tags, input.tags]);
                entity.tags = input.tags;
            }
        }
        // if(input.locations_virtual){ entity.locations_virtual = input.locations_virtual; }
        // if(input.locations_physical){ entity.locations_physical = input.locations_physical; }
        // if(input.contacts){ entity.contacts = input.contacts; }

        callback(null, entity, changes);
    };

    var validate = function (entity, callback) {
        console.log('TODO: Add domain logic for: event');
        callback(null, entity);
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
            var listModel = new EventModelList().fromRaw(rawItem);
            newColl.push(listModel);
        }
        callback(newColl);
    };
    var pushRawCollectionToSimple = function (collection, callback) {
        var newColl = [];
        for (var i = 0; i < collection.length; i++) {
            var rawItem = collection[i];
            var simpleModel = new EventModelSimple().fromRaw(rawItem);
            newColl.push(simpleModel);
        }
        callback(newColl);
    };
    var pushRawCollectionToDetail = function (collection, callback) {
        var newColl = [];
        for (var i = 0; i < collection.length; i++) {
            var rawItem = collection[i];
            var detailModel = new EventModelDetail().fromRaw(rawItem);
            newColl.push(detailModel);

            // Perform Mapping
            newColl.push(detailModel);
        }
        callback(newColl);
    };

    var pushRawSingleToList = function (rawItem, callback) {
        var listModel = new EventModelList().fromRaw(rawItem);
        callback(null, listModel);
    };
    var pushRawSingleToSimple = function (rawItem, callback) {
        var simpleModel = new EventModelSimple().fromRaw(rawItem);
        callback(null, simpleModel);
    };
    var pushRawSingleToDetail = function (rawItem, callback) {
        var detailModel = new EventModelDetail().fromRaw(rawItem);
        callback(null, detailModel);
    };

    function isValidObjectID(str) {
        var len = str.length, valid = false;
        if (len == 12 || len == 24) {
            valid = /^[0-9a-fA-F]+$/.test(str);
        }
        return valid;
    }

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
        delete: Delete,
        deleteById: DeleteById,

        // Manage Physical Locations
        plocById: PhysicalLocationById,
        addPloc: PhysicalLocationAdd,
        updatePloc: PhysicalLocationUpdate,
        removePloc: PhysicalLocationRemove
    }
};

EventRepository.prototype = new _base();

module.exports = EventRepository;