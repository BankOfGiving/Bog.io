var mongoose = require('mongoose');
var db = require('../config/db.mongo').development;

mongoose.createConnection(db.connectionString);

var userSchema = new mongoose.Schema({
	fbId: String,
	name: String,
	email: { type: String, lowercase: true },
	photos: Array
});

userSchema.methods.ImportFromFacebookProfile = function (profile) {
    var self = this;
    var query = User.findOne({ 'fbId': profile.id});
    var user;
    query.exec(function(err, oldUser) {
        if(oldUser) {
            user = oldUser;
        } else {
            self.fbId = profile.id;
            self.name = profile.displayName;
            self.email = profile.emails[0].value;
            self.photos = profile.photos;
            self.save(function(err) {
                if (err) throw err;
            });
        }
        if(this != null) { }
    });
};

userSchema.statics.GetUserFromFacebookProfile = function(profile, callback) {
    var query = this.findOne({ 'fbId': profile.id });
    query.exec(function (err, oldUser) {
        if(oldUser) {
            callback(null, oldUser);
        } else {
            var newUser = new User();
            newUser.fbId = profile.id;
            newUser.name = profile.displayName;
            newUser.email = profile.emails[0].value;

            newUser.save(function(err) {
                if(err) {throw err;}
                callback(null, newUser);
            });
        }
    });
};

module.exports = mongoose.model('User', userSchema);