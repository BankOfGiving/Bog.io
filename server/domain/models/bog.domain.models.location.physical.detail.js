var LocationDetail = function () {

    var model = {
        id: '', //ObjectId,
        primary: '', // { type: Boolean, Default: false },
        street: '', // { type: String },
        city: '', // { type: String },
        state: '', // { type: String },
        postal_code: '', // { type: String },
        country: '', // { type: String },
        additional_data: '', // {},
        latitude: '', // { type: String },
        longitude: '', // { type: String },
        geocoding_result: {},  // raw response from service
        geospacial_index: {
            type: { type: String, Default: "Point" },
            coordinates: [] // longitude, latitude
        },
        validated: '' //{ type: Boolean, Default: false}
    };

    var fromRaw = function (raw) {
        model.id = raw._id;
        model.primary = raw.primary;
        model.street = raw.street;
        model.city = raw.city;
        model.state = raw.state;
        model.postal_code = raw.postal_code;
        model.country = raw.country;
        model.additional_data = raw.additional_data;
        model.latitude = raw.latitude;
        model.longitude = raw.longitude;
        return model;
    };

    return{
        fromRaw: fromRaw
    };
};

module.exports = LocationDetail;