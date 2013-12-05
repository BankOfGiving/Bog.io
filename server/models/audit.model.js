var mongoose = require('mongoose');
var db = require('../config/db.mongo').development;
var unirest = require('unirest');

mongoose.createConnection(db.connectionString);

var User = require('./user.model.js');

var ObjectId = mongoose.Schema.Types.ObjectId;
var auditSchema = new mongoose.Schema({
    id: ObjectId,
    entityType:  String,
    entityId:  String,
    action:  String,
    timeStamp: { type: Date, default: Date.now },
    actor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    notes: String
});

auditSchema.index({ "address.geometry.location": "2d"});

auditSchema.statics.getByObjectId = function (id, callback) {
    var query = this.findById(id);
    query.exec(function (err, results) {
        if(err) {
            callback(err, null);
        }
        if(results == null) {
            callback('no data', null);
        }else{
            callback(null, results);
        }
    });
};

module.exports = mongoose.model('Audit', auditSchema);