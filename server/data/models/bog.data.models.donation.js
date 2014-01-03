var dbconn = require('../../config/db.mongo');
var mongoose = require('mongoose');
mongoose.createConnection(dbconn.connectionString);

var ObjectId = mongoose.Schema.Types.ObjectId;

var User = require('./user.model.js');
var Tag = require('./tag.model.js');
var Audit = require('./bog.data.models.audit.js');

var donationSchema = new mongoose.Schema({
    id: ObjectId,
    title: String,
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    description: String,
    type: String,
    comments: [
        { body: String, date: Date }
    ],
    tags: [Tag],
    active: Boolean,
    deleted: Boolean,
    meta: {
        votes: Number,
        favs: Number
    },
    address: {
        "formatted_address": String,
        "address_components": [
            {
                "long_name": String,
                "short_name": String,
                "types": Array
            }
        ],
        "location": [Number]  // [lng, lat]
    },
    createdAt: { type: Date, default: Date.now },
    lastModifiedAt: { type: Date, default: Date.now},
    audit: [Audit]
});

donationSchema.index({ "address.geometry.location": "2d"});

module.exports = mongoose.model('Donation', donationSchema);

