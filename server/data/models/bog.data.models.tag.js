var dbconn = require('../../config/db.mongo');
var mongoose = require('mongoose');
mongoose.createConnection(dbconn.connectionString);

var ObjectId = mongoose.Schema.Types.ObjectId;

var tagSchema = new mongoose.Schema({
    id: ObjectId,
    tag: { type: String, lowercase: true, trim: true },
    description: String
});

module.exports = mongoose.model('Tag', tagSchema);