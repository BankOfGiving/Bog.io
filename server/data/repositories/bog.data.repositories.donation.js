module.exports = bog.Namespace('bog.data.repositories.donation', function () {

    var getByObjectId = function (id, callback) {
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


    donationSchema.statics.AddUpdateFromObject = function (input, createIfNotFound, user, callback) {
        var self = this;
        var id = input._id;
        var donation;

        console.log(id);

        if (id) {
            self.findById(id, function (err, donation) {
                if (err) {
                    // Return the error.
                    callback(err, null);
                }
                if (!err && !donation && !createIfNotFound) {
                    // No record found to update and do not create a new one.
                    callback(new Error('no item found with id: ' + id), null);
                }
                if (!err && !donation && createIfNotFound) {
                    // No record found to update.  Create a new one
                    donation = new self();
                }

                self.SaveFromObject(donation, input, user, function (err, donation) {
                    callback(err, donation);
                });
            });
        } else {
            donation = mongoose.model("Donation", donationSchema);
            self.SaveFromObject(donation, input, user, function (err, donation) {
                callback(err, donation);
            });
        }
    };

    donationSchema.statics.getByLocation = function (lat, lng, rad, callback) {
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

    donationSchema.statics.createSeed = function (seed, callback) {
        var donation = new this();

        if (seed) {
            donation.address = {
                geometry: {
                    location: [randomFromInterval(-124.848974, -66.885444), randomFromInterval(24.396308, 49.384358)]
                }
            };
            callback(donation);
        } else {
            callback(donation);
        }
    };
});