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
    };
};
