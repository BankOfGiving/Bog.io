var EventSimple = function () {
    var self = this;

    var SimpleModel = {
        entity: 'event', //entity type
        id: '',
        title: ''
    };

    var fromRaw = function (raw) {
        var model = SimpleModel;
        model.id = raw._id;
        model.title = raw.title;
        return model;
    };

    return{
        fromRaw: fromRaw
    };
};

module.exports = EventSimple;