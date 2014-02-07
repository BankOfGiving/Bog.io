var dbconn = require('../../config/db.mongo');
var mongoose = require('mongoose');
mongoose.createConnection(dbconn.connectionString);

var ObjectId = mongoose.Schema.Types.ObjectId;

var contactSchema = new mongoose.Schema({
    full_name: { type: String },
    email: { type: String },
    phone: { type: String },
    info: { type: String },
    primary: { type: Boolean }
});