module.exports = function () {
    var Errors = require('../../modules/bog.errors');
    var Logger = require('../../modules/bog.logging');

    var mongoose = require('mongoose');
    var db = require('../../config/db.mongo');

    mongoose.createConnection(db.connectionString);

    return {
        err: new Errors(),
        logger: new Logger(),
        mongoose: mongoose
    };
};