var LocationSimple = function () {
    var model = {
        id: '', //ObjectId,
        street: '', // { type: String },
        city: '', // { type: String },
        state: '', // { type: String },
        postal_code: '', // { type: String },
        country: '' // { type: String },
    };

    var fromRaw = function (raw) {
        model.id = raw._id;
        model.street = raw.street;
        model.city = raw.city;
        model.state = raw.state;
        model.postal_code = raw.postal_code;
        model.country = raw.country;
        return model;
    };

    return{
        fromRaw: fromRaw
    }
};

module.exports = LocationSimple;