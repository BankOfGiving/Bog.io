var EventSimple = function () {
    var self = this;

    var SimpleModel = {
        id: '',
        title: '',
        description: '',
        type: '',
        beginAt: '',
        endAt: '',
        status: ''
    };

    var fromRaw = function (raw) {
        SimpleModel.id = raw._id;
        SimpleModel.title = raw.title;
        SimpleModel.description = raw.description;
        SimpleModel.type = raw.type;
        SimpleModel.beginAt = raw.beginAt;
        SimpleModel.endAt = raw.endAt;
        SimpleModel.status = raw.status;
        return SimpleModel;
    }

    return{
        fromRaw: fromRaw
    }
};

module.exports = EventSimple;