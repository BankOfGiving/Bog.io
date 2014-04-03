var _base = require('./bog.data.repositories._base');
var EventModel = require('../models/bog.data.models.event');

EventRepository = function () {

    var All = function (callback) {
        var query = EventModel.find();
        query.exec(function (err, data) {
            callback(err, data);
        });
    };

    var Find = function (filters, callback) {
        var conditions = {
            status: { $ne: 'deleted' }
        };
        if (filters.type) {
            conditions.type = filters.type;
        }

        var fields = null;
        var options = null;
        var query = EventModel.find(conditions, fields, options).populate('locations_physical');
        console.log(query);
        query.exec(function (err, data) {
            callback(err, data);
        });
    };

    var FindById = function (id, callback) {
        var query = EventModel.findById(id).populate('locations_physical');
        query.exec(function (err, data) {
            callback(err, data);
        });
    };

    var Add = function (input, callback) {
        EventModel.create(input, function (err, data, numberAffected) {
            callback(err, data, numberAffected);
        });
    };

    var Save = function (input, callback) {
        input.save(function (err, data, numberAffected) {
            callback(err, data, numberAffected);
        });
    };

    var Update = function (id, input, callback) {
        var obj = input.toObject();
        delete obj.id;
        delete obj._id;
        EventModel.update({ _id: id }, obj, {upsert: false}, function (err, numberAffected, data) {
            callback(err, input, numberAffected);
        });
    };

    return{
        all: All,
        find: Find,
        findById: FindById,
        save: Save,
        add: Add,
        update: Update
    };
};

EventRepository.prototype = new _base();

module.exports = EventRepository;