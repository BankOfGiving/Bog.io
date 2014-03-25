var dbconn = require('../../../secrets/db.mongo');
var mongoose = require('mongoose');
mongoose.createConnection(dbconn.connectionString);

var ObjectId = mongoose.Schema.Types.ObjectId;

var physicalLocationSchema = new mongoose.Schema({
    id: ObjectId,
    primary: { type: Boolean, Default: false },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postal_code: { type: String },
    country: { type: String },
    additional_data: {},
    latitude: { type: String },
    longitude: { type: String },
    geocoding_result: {},  // raw response from service
    geospacial_index: {
        type: { type: String, Default: "Point" },
        coordinates: [] // longitude, latitude
    },
    validated: { type: Boolean, Default: false}
});


module.exports = mongoose.model('location_physical', physicalLocationSchema, 'locations_physical');