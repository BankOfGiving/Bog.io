module.exports = function () {

    var pullText = function (path, culture) {
        var returnText = '[][][][][][][][][][][][][][][][][][]';
        loadCultureText(culture, function (text) {
            var locText = valueByString(text, path);
            if (typeof locText === 'undefined') {
                // Log error to capture request of undefined key.
            } else {
                returnText = locText;
            }
        });

        return returnText;
    };

    var txt_enus = {

        errors: {
            PermissionDenied: 'Permission denied for this action.'
        }
    };

    var loadCultureText = function (culture, callback) {
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