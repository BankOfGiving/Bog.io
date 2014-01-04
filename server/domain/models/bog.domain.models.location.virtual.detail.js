var LocationDetail = function () {

    var model = {
        id: '', // ObjectId,
        name: '', // {type: String },
        uri: '', // {type: String },
        verified: '', // { type: Boolean, Default: false}
        description: '', // {type: String },
        additional_data: {}
    };

    var fromRaw = function (raw) {
        model.id = raw._id;
        model.name = raw.name;
        model.uri = raw.uri;
        model.description = raw.description;
        model.verified = raw.verified;
        model.additional_data = raw.additional_data;
        return model;
    };

    return{
        fromRaw: fromRaw
    }
};

module.exports = LocationDetail;