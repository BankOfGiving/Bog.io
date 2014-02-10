solicitationSchema.statics.getByObjectId = function (id, callback) {
    var query = this.findById(id);
    query.exec(function (err, results) {
        if (err) {
            callback(err, null);
        }
        if (results === null) {
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
    var solicitation = new this();

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
    return Math.random() * (to - from + 1) + from;
}

module.exports = mongoose.model('Solicitation', solicitationSchema);