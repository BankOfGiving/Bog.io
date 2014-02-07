module.exports = function () {
    var Errors = require('../../modules/bog.errors');
    var Logger = require('../../modules/bog.logging');
    var Internationalization = require('../../modules/bog.i18n');
    var Authorization = require('../../modules/bog.authorization');

    return {
        err: new Errors(),
        logger: new Logger(),
        i18n: new Internationalization(),
        authorization: new Authorization()
    }
};