if (!bog) {
    var bog = {};
}
bog.cache = function () {
    var enable_local_cache = window.local_cache;
    var __has_local_storage = function () {
        var test = 'test';
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    };

    var get_json = function (variable, callback) {
        if (enable_local_cache === false) {
            if (callback) {
                callback(null);
            } else {
                return false;
            }
        }
        if (__has_local_storage) {
            var ls_item = JSON.parse(localStorage.getItem(variable));
            callback(ls_item);
        } else {
            callback(null);
        }
    };
    var set_json = function (key, value, callback) {
        if (enable_local_cache === false) {
            if (callback) {
                callback(null);
            } else {
                return false;
            }
        }
        if (__has_local_storage) {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            // TODO implement secondary caching.
        }
    };

    var get_text = function (key, callback) {
        if (enable_local_cache === false) {
            if (callback) {
                callback(null);
            } else {
                return false;
            }
        }
        if (__has_local_storage) {
            var ls_item = localStorage.getItem(key);
            if (callback) {
                callback(ls_item);
            } else {
                return ls_item;
            }
        } else {
            if (callback) {
                callback(null);
            } else {
                return null;
            }
        }
    };
    var set_text = function (key, value, callback) {
        if (enable_local_cache === false) {
            if (callback) {
                callback(null);
            } else {
                return false;
            }
        }
        if (__has_local_storage) {
            localStorage.setItem(key, value);
        } else {
            return null;
        }
    };

    return {
        get_json: get_json,
        set_json: set_json,
        get_text: get_text,
        set_text: set_text
    };
};
