module.exports = function () {
    var Localization = require('./bog.i18n');
    //var Logging = require('./bog.logging');

    var loc = new Localization();
    //var log = new Logging();

    var ThrowError = function (type, source, args) {
        switch (type) {
            case 'PermissionDenied':
                throw new PermissionsError(null, null);
        }
    };

    var WrapForResponse = function (st, msg, det) {
        return  { error: {status: st, message: msg, source: arguments.callee.caller.name, details: det }}
    };

    var PermissionsError = function (source, args) {
        this.name = "PermissionsError";
        this.message = loc.pullText('errors.PermissionDenied', 'en-us');
    };

    var init = function () {
        console.log("init()");
    };

    return {
        init: init,
        throwError: ThrowError,
        wrapForResponse: WrapForResponse
    };
};