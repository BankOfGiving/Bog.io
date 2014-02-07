var dbconn = require('../../config/db.mongo');
var mongoose = require('mongoose');
mongoose.createConnection(dbconn.connectionString);

var ObjectId = mongoose.Schema.Types.ObjectId;

var solicitationSchema = new mongoose.Schema({
    id: ObjectId,
    title: String,
    author: String,
    description: String,
    type: String,
    comments: [
        { body: String, date: Date }
    ],
    tags: [
        { tag: String }
    ],
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    },
    address: {
        "address_components": [
            {
                "long_name": String,
                "short_name": String,
                "types": Array
            }
        ],
        "location": [Number]  // [lng, lat]
    },
    audit: {
        createdAt: { type: Date, default: Date.now },
        lastModifiedAt: { type: Date, default: Date.now }
    }
});

solicitationSchema.index({ "address.geometry.location": "2d"});
