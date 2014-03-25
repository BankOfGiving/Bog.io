var dbconn = require('../../../secrets/db.mongo');
var mongoose = require('mongoose');
mongoose.createConnection(dbconn.connectionString);

var ObjectId = mongoose.Schema.Types.ObjectId;

var virtualLocationSchema = new mongoose.Schema({
    id: ObjectId,
    name: {type: String },
    uri: {type: String },
    description: {type: String },
    additional_data: {},
    validated: { type: Boolean, Default: false}
});


module.exports = mongoose.model('location_virtual', virtualLocationSchema, 'locations_virtual');