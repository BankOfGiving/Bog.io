var _base = require('./bog.data.repositories._base');
var DonationModel = require('../models/bog.data.models.donation');

DonationRepository = function () {

    var All = function (callback) {
        var query = DonationModel.find();
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
        var query = DonationModel.find(conditions, fields, options);
        query.exec(function (err, data) {
            callback(err, data);
        });
    };

    var FindById = function (id, callback) {
        var query = DonationModel.findById(id).populate('locations_physical');
        query.exec(function (err, data) {
            callback(err, data);
        });
    };

    var Add = function (input, callback) {
        DonationModel.create(input, function (err, data, numberAffected) {
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
        DonationModel.update({ _id: id }, obj, {upsert: false}, function (err, numberAffected, data) {
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

DonationRepository.prototype = new _base();

module.exports = DonationRepository;