module.exports = function () {
    var Errors = require('../../bog/bog.errors');
    var Logger = require('../../bog/bog.logging');
    var Internationalization = require('../../bog/bog.i18n');
    var Authorization = require('../../bog/bog.authorization');

    return {
        err: new Errors(),
        logger: new Logger(),
        i18n: new Internationalization(),
        authorization: new Authorization()
    };
};