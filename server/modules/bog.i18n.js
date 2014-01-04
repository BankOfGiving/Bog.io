module.exports = function (culture) {

    var pullText = function (path) {
        var returnText = '[][][][][][][][][][][][][][][][][][]';
        loadCultureText(function (text) {
            var locText = valueByString(text, path);
            if (typeof locText === 'undefined') {
                console.log('Unable to locate text key:  ' + path + ' for culture ' + culture);
            } else {
                returnText = locText;
            }
        });
        return returnText;
    };

    var txt_enus = {

        errors: {
            general: {
                invalid_request: 'Invalid request.',
                request_error: 'Error processing request.'
            },
            data: {
                no_id: 'Invalid id specified.',
                invalid_depth: 'Invalid depth specified.',
                invalid_id: 'Invalid id specified.'
            },
            authorization: {
                not_auth: 'User is not authorized',
                access_denied: 'Permission denied for this action.',
                no_anon_access: 'Anonymous access is not allowed for this action.'
            },
            event: {
                no_id: 'No id specified.',
                invalid_id: 'Invalid event id specified.',
                no_depth: 'No depth specified.',
                invalid_depth: 'Invalid depth specified.',
                no_input: 'No input sent.',
                no_results: 'No results matching the criteria.',
                no_result: 'No item found matching the criteria.'
            },
            location_physical: {
                invalid_id: 'Invalid id specified.'

            },
            location_virtual: {

            },
            contact: {

            }
        }
    };

    var loadCultureText = function (callback) {
        switch (culture) {
            case 'en-us':
                callback(txt_enus);
                break;
            default:
                callback(txt_enus);
                break;
        }
    };

    var valueByString = function (o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        var a = s.split('.');
        while (a.length) {
            var n = a.shift();
            if (n in o) {
                o = o[n];
            } else {
                return;
            }
        }
        return o;
    };

    return {
        pullText: pullText,
        txt_enus: txt_enus
    }
};
