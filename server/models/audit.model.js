var mongoose = require('mongoose');
var db = require('../config/db.mongo');

mongoose.createConnection(db.connectionString);

var ObjectId = mongoose.Schema.Types.ObjectId;
var auditSchema = new mongoose.Schema({
    id: ObjectId,
    entityType: String,
    entityId: String,
    action: String,
    timeStamp: { type: Date, default: Date.now },
    actor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    notes: String,
    changeList: { type: Array, default: [] }
});

module.exports = mongoose.model('Audit', auditSchema);