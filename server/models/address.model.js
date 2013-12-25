var mongoose = require('mongoose');
var dbconn = require('../config/db.mongo');

mongoose.createConnection(dbconn.connectionString);

var ObjectId = mongoose.Schema.Types.ObjectId;

var eventSchema = new mongoose.Schema({
});