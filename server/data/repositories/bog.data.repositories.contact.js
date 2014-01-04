var _base = require('./bog.data.repositories._base');
var ContactModel = require('../models/bog.data.models.location.virtual');

ContactRepository = function () {

    var All = function (callback) {
        var query = ContactModel.find();
        query.exec(function (err, data) {
            callback(err, data);
        });
    };

    var Find = function (filters, callback) {
        var conditions = {
            status: { $ne: 'deleted' }
        };
        var fields = null;
        var options = null;
        var query = ContactModel.find(conditions, fields, options);
        query.exec(function (err, data) {
            callback(err, data);
        });
    };

    var FindById = function (id, callback) {
        var query = ContactModel.findById(id);
        query.exec(function (err, data) {
            callback(err, data);
        });
    };

    var Add = function (input, callback) {
        ContactModel.create(input, function (err, data, numberAffected) {
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
        ContactModel.update({ _id: id }, obj, {upsert: false}, function (err, numberAffected, data) {
            callback(err, input, numberAffected);
        });
    };

    var Delete = function (input, callback) {
        input.remove(function (err, data) {
            callback(err, data);
        });
    };

    return{
        all: All,
        find: Find,
        findById: FindById,
        save: Save,
        add: Add,
        update: Update,
        delete: Delete
    }
};

ContactRepository.prototype = new _base();

module.exports = ContactRepository;