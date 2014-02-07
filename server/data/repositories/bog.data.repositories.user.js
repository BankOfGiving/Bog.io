/**
 * Created by dbaxter on 12/26/13.
 */

User.statics.UpdateFromObject = function (userObject, callback) { // callback(err, numberAffected, raw)
    var self = this;
    var query = { _id: userObject._id };
    console.log(query);
    var updates = {
        displayName: userObject.displayName,
        name: {
            given: userObject.given,
            middle: userObject.middle,
            family: userObject.family
        }
    };
    console.log(updates);
    self.update(query, updates,
        {
            multi: true
        }, function (err, numberAffected, raw) {
            callback(err, numberAffected, raw);
        }
    )
};


User.statics.findByProviderId = function (provider, id, callback) {
    var self = this;
    var query = self.findOne(({'providers.id': id, 'providers.provider': provider}));
    query.exec(function (err, user) {
        callback(err, user);
    });
};

User.statics.findByEmail = function (email, callback) {
    var self = this;
    if (email == null || email == '') {
        callback(new Error("invalid email address"));
    }
    var query = self.findOne(({'emails.value': email}));
    query.exec(function (err, user) {
        callback(err, user);
    });
};

User.statics.findByEmailArray = function (emailArray, callback) {  // callback(err, user)
    var self = this;
    console.log(emailArray);
    if (emailArray == null || emailArray == '') {
        callback(new Error("invalid email address array"), null);
        return;
    }
//    if(emailArray.prototype.toString != "[object Array]"){
//        callback(new Error("invalid email address array"), null);
//        return;
//    }
    if (emailArray.length == 0) {
        callback(new Error("invalid email address array"), null);
        return;
    }
    var query = self.findOne(({'emails.value': emailArray}));
    query.exec(function (err, user) {
        callback(err, user);
    });
};

User.statics.findByPassportProfile = function (profile, callback) {  // callback(err, user)
    var self = this;
    self.findByProviderId(profile.provider, profile.id, function (err, user) {
        if (user) {
            callback(null, user)
        }

        // if user not found, check for email match
        var emailArray = [];
        for (var i = 0; i < profile.emails.length; i++) {
            emailArray.push(profile.emails[i].value)
        }
        self.findByEmailArray(emailArray, function () {
            if (user) {
                callback(new Error("email match"), user);
            } else {
                callback(null, null);
            }
        })
    });
};

User.statics.MapPassportProfileToUser = function (profile, user, callback) {  // callback(err, user)
    var Provider = mongoose.model("Provider", Provider);
    var Email = mongoose.model("Email", Email);
    var Photo = mongoose.model("Photo", Photo);

    user.displayName = profile.displayName;
    console.log(profile.name);
    user.name = {
        family: profile.name.familyName,
        given: profile.name.givenName,
        middle: profile.name.middleName
    };


    // update the information in the provider collection
    var provider = null;
    for (p = 0; p < user.providers; p++) {
        if (user.providers[p].provider == profile.provider) {
            provider = user.providers[p];
        }
    }

    if (provider) {
        provider.lastLogin = Date.now();
    } else {
        var facebook = new Provider({ provider: profile.provider, id: profile.id });
        user.providers.push(facebook);
    }


    // capture any new email accounts that may be associated with this user.
    var emails = [];
    for (var e = 0; e < user.emails; e++) {
        emails.push(user.emails[e].value);
    }
    for (var i = 0; i < profile.emails.length; i++) {
        if (emails.indexOf(profile.emails[i].type) == -1) {
            var email = new Email({
                label: profile.emails[i].type,
                value: profile.emails[i].value
            });
            user.emails.push(email);
        }
    }

    if (profile.photos) {
        for (var p = 0; p < profile.photos.length; p++) {
            var photo = new Photo({
                value: profile.photos[p].value
            });
            user.photos.push(photo);
        }
    }
    callback(null, user);
};