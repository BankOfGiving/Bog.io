var mongoose = require('mongoose');
var db = require('../config/db.mongo').development;

mongoose.createConnection(db.connectionString);

var ObjectId = mongoose.Schema.Types.ObjectId;

var User = require('./user.model.js');
var Tag = require('./tag.model.js');
var Audit = require('./audit.model.js');

var donationSchema = new mongoose.Schema({
    id: ObjectId,
    title:  String,
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    description: String,
    type:  String,
    comments: [{ body: String, date: Date }],
    tags: [Tag],
    active: Boolean,
    deleted: Boolean,
    meta: {
        votes: Number,
        favs:  Number
    },
    address : {
        "address_components" : [
            {
                "long_name" : String,
                "short_name" : String,
                "types" : Array
            }],
        "location" : [Number]  // [lng, lat]
    },
    createdAt: { type: Date, default: Date.now },
    lastModifiedAt: { type: Date, default: Date.now},
    audit: [Audit]
});

donationSchema.index({ "address.geometry.location": "2d"});

donationSchema.statics.getByObjectId = function (id, callback) {
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

donationSchema.statics.SaveFromObject = function(donation, input, user, callback){ // callback(err, donation)
    console.log(donation);
    donation.title = input.title;
    donation.author = user;
    donation.description = input.description;
    donation.type = input.type;
    donation.address = input.address;
    donation.save(function (err, donation) {
        if (err) { callback(err, null); }
        callback(null, donation);
    });
};

donationSchema.statics.AddUpdateFromObject = function(input, createIfNotFound, user, callback){ // callback(err, donation)
    var self = this;
    var id = input._id;
    var donation;

    console.log(id);

    if(id){
        self.findById( id, function (err, donation) {
            if(err){
                // Return the error.
                callback (err, null);
            }
            if(!err && !donation && !createIfNotFound){
                // No record found to update and do not create a new one.
                callback(new Error('no item found with id: ' + id), null);
            }
            if(!err && !donation && createIfNotFound){
                // No record found to update.  Create a new one
                donation = new self();
            }

            self.SaveFromObject(donation, input, user, function(err, donation){
                callback (err, donation);
            });
        });
    }else{
        donation = mongoose.model("Donation", donationSchema);
        self.SaveFromObject(donation, input, user, function(err, donation){
            callback (err, donation);
        });
    }
};

    donationSchema.statics.getByLocation = function (lat, lng, rad, callback) {
        var query  = this.find( { 'address.geometry.location' : {
            $near : {
                $geometry: {
                    type: 'Point',
                    coordinates: [lng, lat]
                }
            },
            $maxDistance: rad }
        });
        query.exec(function (err, coll) {
            if (err){
            }else{
                callback(err, coll);
            }
        });
    };

    donationSchema.statics.createSeed = function (seed, callback) {
        var donation = new this;

        if(seed){
            donation.address = {
                geometry : {
                    location: [randomFromInterval(-124.848974, -66.885444), randomFromInterval(24.396308, 49.384358)]
                }
            };
            callback(donation);
        } else {
            callback(donation);
        }
    };

    function randomFromInterval(from,to) {
        return Math.random()*(to-from+1)+from;
    }

    module.exports = mongoose.model('Donation', donationSchema);

