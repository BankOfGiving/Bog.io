tagSchema.statics.getByObjectId = function (id, callback) {
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