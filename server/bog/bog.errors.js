module.exports = function () {
    var I18n = require('./bog.i18n.js');
    // var Linq = require('linq');
    // var Logging = require('./bog.logging');

    var i18n = new I18n();
    //var log = new Logging();

    var WrapForResponse = function (code, alt_msg, inner) {
        var error_node = getErrorNode(code);
        var error_message;
        if (error_node) {
            error_message = i18n.pullText(error_node.message);
        } else {
            error_message = 'Fix error translation';
        }

        var return_error = {
            error: {
                code: code,
                message: error_message,
                source: arguments.callee.caller.line
            }
        };
        if (inner) {
            return_error.inner = inner;
        }

        return return_error;
    };

    var getErrorNode = function (code) {
        for (var i = 0; i < errors.length; i++) {
            if (errors[i].code == code) {
                return errors[i];
            }
        }

//        new Linq(errors)
//            .Select(function(e) {return e.message})
//            .Where(function(e) { return e.code == code });
        return null;
    };

    var errors = [
        // General
        {code: 1000, message: 'errors.general.invalid_request'},
        {code: 1001, message: 'errors.general.request_error'},

        // Data
        {code: 2001, message: 'errors.data.invalid_id'}, // Invalid id
        {code: 2002, message: 'errors.data.invalid_depth'}, // Invalid depth
        {code: 2003, message: 'errors.data.invalid_input'}, // Invalid input

        {code: 2010, message: 'errors.data.no_object'}, // Unable to find object

        // Authorization
        {code: 4000, message: 'errors.authorization.not_auth'}, // User is not authorized
        {code: 4001, message: 'errors.authorization.access_denied'}, // Access denied
        {code: 4002, message: 'errors.authorization.no_anon_access'}, // No anonymous access

        // Event
        {code: 5000, message: 'errors.event.no_id'}, // Missing event id
        {code: 5001, message: 'errors.event.invalid_id'}, // Invalid event id
        {code: 5002, message: 'errors.event.no_depth'}, // Missing depth
        {code: 5003, message: 'errors.event.invalid_depth'}, // Invalid depth
        {code: 5004, message: 'errors.event.invalid_input'}, // Invalid input
        {code: 5005, message: 'errors.event.no_results'}, // No results
        {code: 5006, message: 'errors.event.no_result'}, // No results

        // Physical Location
        {code: 5100, message: 'errors.location_physical.no_id'}, // Missing location id
        {code: 5101, message: 'errors.location_physical.invalid_id'}, // Invalid location id
        {code: 5102, message: 'errors.location_physical.no_depth'}, // Missing depth
        {code: 5103, message: 'errors.location_physical.invalid_depth'}, // Invalid location depth
        {code: 5104, message: 'errors.location_physical.invalid_input'}, // Invalid location input

        // Physical Location
        {code: 5200, message: 'errors.location_virtual.no_id'}, // Missing event id
        {code: 5201, message: 'errors.location_virtual.invalid_id'}, // Invalid event id
        {code: 5202, message: 'errors.location_virtual.no_depth'}, // Missing depth
        {code: 5203, message: 'errors.location_virtual.invalid_depth'}, // Invalid depth
        {code: 5204, message: 'errors.location_virtual.invalid_input'} // Invalid input
    ];

    return {
        wrap: WrapForResponse
    };
};
