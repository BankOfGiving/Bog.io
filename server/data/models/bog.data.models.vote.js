var dbconn = require('../../secrets/db.mongo');
var mongoose = require('mongoose');
mongoose.createConnection(dbconn.connectionString);

var ObjectId = mongoose.Schema.Types.ObjectId;

var voteSchema = new mongoose.Schema({
    vote: { type: String, enum: ['-1', '+1']},
    date: { type: Date},
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});
