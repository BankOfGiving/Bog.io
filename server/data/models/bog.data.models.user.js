var dbconn = require('../../config/db.mongo');
var mongoose = require('mongoose');
mongoose.createConnection(dbconn.connectionString);

// Provider
var Provider = new mongoose.Schema({
    provider: String,
    id: String,
    lastLogin: { type: Date, Default: Date.now}
});
mongoose.model("Provider", Provider);

// Email
var Email = new mongoose.Schema({
    value: String,
    label: {type: String, lowercase: true}
});
mongoose.model("Email", Email);

// Photo
var Photo = new mongoose.Schema({
    value: String
});
mongoose.model("Photo", Photo);

// User
var User = new mongoose.Schema({
    providers: [Provider],
    displayName: String,
    name: {
        family: String,
        given: String,
        middle: String
    },
    emails: [Email],
    photos: [Photo]
});


module.exports = mongoose.model('User', User);