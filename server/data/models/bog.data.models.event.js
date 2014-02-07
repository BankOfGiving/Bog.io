var dbconn = require('../../config/db.mongo');
var mongoose = require('mongoose');
mongoose.createConnection(dbconn.connectionString);

var ObjectId = mongoose.Schema.Types.ObjectId;

var Audit = require('./bog.data.models.audit');
var Tag = require('./bog.data.models.tag');
var User = require('./bog.data.models.user');
var Vote = require('./bog.data.models.vote');
var Comment = require('./bog.data.models.comment');
var Contact = require('./bog.data.models.contact');

var eventSchema = new mongoose.Schema({
    id: ObjectId,
    title: { type: String },
    description: { type: String },
    type: { type: String },
    beginAt: { type: Date},
    endAt: { type: Date},
    status: { type: String, default: 'private', enum: ['private', 'unlisted', 'public', 'deleted'] },
    tags: [Tag.schema],

    // Location Information
    locations_virtual: [
        {

        }
    ],
    locations_physical: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'location_physical'
        }
    ],
    contacts: [Contact.schema],
    audit: {
        author: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        createdAt: { type: Date},
        lastModifiedAt: { type: Date},
        detail: [Audit.schema]
    },
    votes: {
        up: { type: Number, Default: 0},
        down: { type: Number, Default: 0},
        detail: [Vote.schema]
    },
    comments: {
        total: { type: Number, Default: 0},
        latest: { type: Date },
        detail: [Comment.schema]
    }
});

eventSchema.index({ "locations_physical.geospacial_index": "2dsphere"});

module.exports = mongoose.model('Event', eventSchema);