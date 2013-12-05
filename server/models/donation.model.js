var mongoose = require('mongoose');
var db = require('../config/db.mongo').development;
var unirest = require('unirest');

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
donationSchema.statics.UpsertFromObject = function(input, user, callback){ // callback(err, donation)
    var id = input._id;



    var donation = new this({
        title: input.title,
        author: user,
        description: input.description,
        type: input.type,
        address: {
            location: input.address.location
        }
    });

    if(id){
        // Upsert

    } else {
        // Create
    }

    var donation = new this({
        title: input.title,
        author: user,
        description: input.description,
        type: input.type,
        address: {
            location: input.address.location
        }
    });

//    var donation = new this();
//    donation.title = input.title;
//    donation.author = user;
//    donation.description = input.description;
//    donation.type = input.type;
//    donation.location = input.location;
//    donation.tags = [];
//    for(var i=0;i<input.tags.length; i++){
//        var tag = new Tag( { tag: input.tags[i].tag });
//        donation.tags.push(tag);
//    }
//    console.log('INPUT TITLE:  ' + input.title);
//    console.log('DONATION TITLE:  ' + donation.title);
//    console.log('DONATION:  ' + donation);

    donation.save(function (err) {
        donation.title = input.title;
        if (err){
            console.log(err);
            callback(err, null);
        }
        callback(null, donation);
    });
};

    donationSchema.statics.getByLocation = function (lat, lng, rad, callback) {
        // var query = this.where('addresses.geometry.location').near([lat, lng]).maxDistance(rad);

        var geo = [lng, lat];

//    var lonLat = { $geometry :  { type : "Point" , coordinates : geo } };
//    var query = this.aggregate([
//        {
//            $geoNear: {
//                near: geo,
//                distanceField: "dist.calculated",
//                maxDistance: rad,
//                query: { },
//                includeLocs: "dist.location",
//                uniqueDocs: true,
//                spherical: true,
//                num: 1000
//            }
//        }]
//    );
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
        var rand = Math.random()*(to-from+1)+from;
        return rand;
    }

    module.exports = mongoose.model('Donation', donationSchema);

