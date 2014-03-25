var dbconn = require('../../../secrets/db.mongo');
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
    value: { type: String, unique: true },
    label: {type: String, lowercase: true}
});
mongoose.model("Email", Email);

// Photo
var Photo = new mongoose.Schema({
    value: String
});
mongoose.model("Photo", Photo);

// User
var userSchema = new mongoose.Schema({
    providers: [Provider],
    displayName: String,
    name: {
        family: String,
        given: String,
        middle: String
    },
    emails: [Email],
    photos: [Photo],
    password: String,

    facebook: { type: String, unique: true, sparse: true },
    twitter: { type: String, unique: true, sparse: true },
    google: { type: String, unique: true, sparse: true },
    github: { type: String, unique: true, sparse: true },

    tokens: Array,

    profile: {
        name: { type: String, default: '' },
        gender: { type: String, default: '' },
        location: { type: String, default: '' },
        website: { type: String, default: '' },
        picture: { type: String, default: '' }
    }
});

/**
 * Hash the password for security.
 */

userSchema.pre('save', function (next) {
    var user = this;
    var SALT_FACTOR = 5;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

/**
 *  Get a URL to a user's Gravatar email.
 */

userSchema.methods.gravatar = function (size, defaults) {
    if (!size) size = 200;
    if (!defaults) defaults = 'retro';
    var md5 = crypto.createHash('md5');
    md5.update(this.email);
    return 'https://gravatar.com/avatar/' + md5.digest('hex').toString() + '?s=' + size + '&d=' + defaults;
};

module.exports = mongoose.model('User', userSchema);