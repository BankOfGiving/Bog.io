var mongoose = require('mongoose');
var dbconn = require('../config/db.mongo');

mongoose.createConnection(dbconn.connectionString);

var ObjectId = mongoose.Schema.Types.ObjectId;

var AuditSchema = require('mongoose').model('Audit').schema; // require('./audit.model.js');
var TagSchema = require('mongoose').model('Tag').schema; // require('./audit.model.js');
var UserSchema = require('mongoose').model('User').schema; // require('./audit.model.js');

var Audit = mongoose.model('Audit', AuditSchema);
var Tag = mongoose.model('Tag', TagSchema);
var User = mongoose.model('User', UserSchema);

var contactSchema = new mongoose.Schema({
    full_name: { type: String },
    email: { type: String },
    phone: { type: String },
    info: { type: String },
    primary: { type: Boolean }
});
var commentSchema = new mongoose.Schema({
    body: { type: String},
    date: { type: Date},
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});
var voteSchema = new mongoose.Schema({
    vote: { type: String, enum: ['-1', '+1']},
    date: { type: Date},
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

var eventSchema = new mongoose.Schema({
    id: ObjectId,
    title: { type: String },
    description: { type: String },
    type: { type: String },
    beginAt: { type: Date},
    endAt: { type: Date},
    status: { type: String, default: 'private', enum: ['private', 'unlisted', 'public', 'deleted'] },
    tags: [TagSchema],

    // Location Information
    locations_virtual: [
        {
            name: {type: String },
            uri: {type: String },
            description: {type: String }
        }
    ],
    locations_physical: [
        {
            primary: { type: Boolean, Default: false },
            street: { type: String },
            city: { type: String },
            state: { type: String },
            postal_code: { type: String },
            country: { type: String },
            latitude: { type: String },
            longitude: { type: String },

            geocoding_result: {},
            geospacial_index: {
                type: { type: String, Default: "Point" },
                coordinates: [] // longitude, latitude
            },
            validated: { type: Boolean, Default: false}
        }
    ],
    contacts: [contactSchema],
    audit: {
        author: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        createdAt: { type: Date},
        lastModifiedAt: { type: Date},
        detail: [AuditSchema]
    },
    votes: {
        up: { type: Number, Default: 0},
        down: { type: Number, Default: 0},
        detail: [voteSchema]
    },
    comments: {
        total: { type: Number, Default: 0},
        latest: { type: Date },
        detail: [commentSchema]
    }
});

eventSchema.index({ "location_physical.geospacial_index": "2dsphere"});

// Return Collection
eventSchema.statics.getAllSimpleFiltered = function (filters, callback) {
    var query = this.find({
        // Criteria
        status: { $ne: 'deleted' }
    }, {
        // Projections
        tags: 0,
        location_virtual: 0,
        'location_physical.geocoding_result': 0,
        'location_physical.geospacial_index': 0,
        contacts: 0,
        audit: 0,
        votes: 0,
        comments: 0
    });
    query.exec(function (err, results) {
        callback(err, results);
    });
};

eventSchema.statics.getAllExtendedFiltered = function (filters, callback) {
    var data = [];

    var query = this.find();
    query.exec(function (err, events) {
        for (var i = events.length - 1; i >= 0; i--) {
            var eventExtended = new EventExtended().load(events[i]);
            data.push(eventExtended);
        }

        callback(err, data);
    });
};

eventSchema.statics.getAllFullFiltered = function (filters, callback) {
    var data = [];

    var query = this.find();
    query.exec(function (err, events) {
        for (var i = events.length - 1; i >= 0; i--) {
            data.push(events[i]);
        }

        callback(err, data);
    });
};


// Return Single
eventSchema.statics.getExtendedById = function (id, callback) {
    var query = this.findOne({
        // Criteria
        _id: id
    }, {
        // Projections
        'location_physical.geocoding_result': 0,
        'location_physical.geospacial_index': 0
    });
    query.exec(function (err, result) {
        if (err) {
            callback(err, null);
        }
        if (result == null) {
            callback('no data', null);
        } else {
            callback(null, result);
        }
    });
};

eventSchema.statics.getSimpleById = function (callback) {
    var self = this;

    var query = this.findById(id).populate('author');
    query.exec(function (err, result) {
        if (err) {
            callback(err, null);
        }
        if (results == null) {
            callback('no data', null);
        } else {
            var event = new EventSimple().load(result);
            callback(null, event);
        }
    });
};

eventSchema.statics.getFullById = function (callback) {
    var self = this;

    var query = this.findById(id).populate('author');
    query.exec(function (err, results) {
        if (err) {
            callback(err, null);
        }
        if (results == null) {
            callback('no data', null);
        } else {
            var event = result;
            callback(null, event);
        }
    });
};

// Add / Edit
eventSchema.statics.AddFromObject = function (input, user, callback) {
    var self = this;

    if (!input) {
        throw ('Invalid model.')
    }
    if (!user) {
        throw ('User required to add new records.')
    }

    var newModel = new self();
    mapToModel(input, newModel, function (err, populatedModel) {
        populatedModel.save(function (err, result) {
            if (err) {
                callback(err, null);
            } else {
                self.AddAuditEntry(result, 'create', user);
                callback(null, result);
            }
        });
    });
};

eventSchema.statics.UpdateFromObject = function (input, user, callback) {  // callback(err, model)
    var self = this;

    if (!input) {
        throw ('Invalid model.')
    }
    if (!user) {
        throw ('User required to add new records.')
    }

    var id = input._id;

    //delete input._id;
    self.findById(id, function (err, foundModel) {
        mapToModel(input, foundModel, function (err, populatedModel) {
            populatedModel.save(function (err, result) {
                if (err) {
                    console.log('EDIT EVENT SUCCESS!!');
                    callback(err, null);
                } else {
                    console.log('EDIT EVENT SUCCESS!!');
                    self.AddAuditEntry(result, 'update', user);
                    callback(null, result);
                }
            });
        });
    });
};

eventSchema.statics.AddAuditEntry = function (event, action, actor) {
    var self = this;
    var id = event._id;

    var audit = new Audit({
        entityType: 'Event',
        entityId: id,
        action: action,
        actor: actor
    });

    self.findById(id, function (err, auditEvent) {
        console.log('AUDIT EVENT:  ' + auditEvent);
        if (auditEvent.audit == null) {
            auditEvent.audit = {
                author: actor,
                createdAt: Date.now(),
                detail: []
            };
        } else {
            if (auditEvent.audit.author == null) {
                auditEvent.audit.author = actor;
            }
            if (auditEvent.audit.createdAt == null) {
                auditEvent.audit.createdAt = Date.now();
            }
        }
        auditEvent.audit.lastModifiedAt = Date.now();
        auditEvent.audit.detail.push(audit);

        auditEvent.save(function (err) {
            if (err) console.log('AUDIT SAVE ERROR:' + err);

            return true;
        });
    });
};


eventSchema.statics.DeleteById = function (obj, callback) {
    var event = new this();
    console.log('DELETE EVENT!!');
    callback(null, event);
};

function mapToModel(input, model, callback) {
    if (!input) throw ('Invalid input');
    if (!model) throw ('Invalid model');

    try {
        if (input._id) model._id = input._id;
        if (input.title) model.title = input.title;
        if (input.description) model.description = input.description;
        if (input.type) model.type = input.type;
        if (input.beginAt) model.beginAt = input.beginAt;
        if (input.endAt) model.endAt = input.endAt;
        if (input.status) model.status = input.status;
        if (input.description) model.description = input.description;
        if (input.description) model.description = input.description;
        callback(null, model);
    } catch (err) {
        callback(err, null);
    }
}

module.exports = mongoose.model('Event', eventSchema);