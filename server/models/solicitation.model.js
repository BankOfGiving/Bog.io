var mongoose = require('mongoose');
var db = require('../config/db.mongo');

mongoose.createConnection(db.connectionString);

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

solicitationSchema.statics.getByObjectId = function (id, callback) {
    var query = this.findById(id);
    query.exec(function (err, results) {
        if (err) {
            callback(err, null);
        }
        if (results == null) {
            callback('no data', null);
        } else {
            callback(null, results);
        }
    });
};

solicitationSchema.statics.getByLocation = function (lat, lng, rad, callback) {
    // var query = this.where('addresses.geometry.location').near([lat, lng]).maxDistance(rad);

    var geo = [lng, lat];

//    var lonLat = { $geometry :  { type : "Point" , coordinates : geo } };
//    var query = this.aggregate([
//        {
//            $geoNear: {
//                near: geo,
//                distanceField: "dist.calculated",
//                maxDistance: rad,
//                query: { },
//                includeLocs: "dist.location",
//                uniqueDocs: true,
//                spherical: true,
//                num: 1000
//            }
//        }]
//    );
    var query = this.find({ 'address.geometry.location': {
        $near: {
            $geometry: {
                type: 'Point',
                coordinates: [lng, lat]
            }
        },
        $maxDistance: rad }
    });
    query.exec(function (err, coll) {
        if (err) {
        } else {
            callback(err, coll);
        }
    });
};

solicitationSchema.statics.createSeed = function (seed, callback) {
    var solicitation = new this;

    if (seed) {
        solicitation.address = {
            geometry: {
                location: [randomFromInterval(-124.848974, -66.885444), randomFromInterval(24.396308, 49.384358)]
            }
        };
        callback(solicitation);
    } else {
        callback(solicitation);
    }
};

function randomFromInterval(from, to) {
    var rand = Math.random() * (to - from + 1) + from;
    return rand;
}

module.exports = mongoose.model('Solicitation', solicitationSchema);