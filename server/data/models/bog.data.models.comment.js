var dbconn = require('../../secrets/db.mongo');
var mongoose = require('mongoose');
mongoose.createConnection(dbconn.connectionString);


var ObjectId = mongoose.Schema.Types.ObjectId;

var commentSchema = new mongoose.Schema({
    body: { type: String},
    date: { type: Date},
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});
