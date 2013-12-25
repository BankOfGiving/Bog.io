var mongoose = require('mongoose');
var db = require('../config/db.mongo');
var unirest = require('unirest');

mongoose.createConnection(db.connectionString);

var ObjectId = mongoose.Schema.Types.ObjectId;

var tagSchema = new mongoose.Schema({
    id: ObjectId,
    tag: { type: String, lowercase: true, trim: true },
    description: String
});

tagSchema.index({ "address.geometry.location": "2d"});

tagSchema.statics.getByObjectId = function (id, callback) {
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

module.exports = mongoose.model('Tag', tagSchema);