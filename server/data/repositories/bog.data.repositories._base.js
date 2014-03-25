module.exports = function () {
    var Errors = require('../../bog/bog.errors');
    var Logger = require('../../bog/bog.logging');

    var mongoose = require('mongoose');
    var db = require('../../../secrets/db.mongo');

    mongoose.createConnection(db.connectionString);

    return {
        err: new Errors(),
        logger: new Logger(),
        mongoose: mongoose
    };
};