var bog = bog || {};
bog.i18n = function () {
    var get_module_text = function (culture, key, callback) {
        var cache = new bog.cache();
        var loc_key = culture + '.' + key;
        console.log('LOC_KEY');
        console.log(loc_key);
        cache.get_json(loc_key, function (loc_text) {
            // 1.  Check local storage for specific text.
            console.log('LOC_TEXT');
            console.log(loc_text);
            if (loc_text) {
                callback(loc_text);
            } else {
                // 2.  Check server for specific text.
                $.getJSON('/api/i18n/text/' + loc_key, function (loc_text) {
                    cache.set_json(loc_key, loc_text);
                    callback(loc_text);
                })
                    .fail(function () {
                        if (loc_key.split('.').length === 5) {
                            var loc_key_arr = loc_key.split('.');
                            loc_key_arr.pop();
                            loc_key = loc_key_arr.join('.');
                            cache.get_json(loc_key, function (loc_text) {
                                // 3.  Check local storage for generic text.
                                if (loc_text) {
                                    callback(loc_text);
                                } else {
                                    // 4.  Check server for generic text.
                                    $.getJSON('/api/i18n/text/' + loc_key, function (loc_text) {
                                        cache.set_json(loc_key, loc_text);
                                        callback(loc_text);
                                    })
                                        .fail(function () {
                                            callback(null);
                                        });
                                }
                            });
                        } else {
                            callback(null);
                        }
                    });
            }
        });
    };

    var get_culture = function (callback) {
        if (window.culture) {
            if (callback) {
                callback(window.culture);
            } else {
                return window.culture;
            }
        } else {
            var cache = new bog.cache();
            cache.get_text('current_culture', function (culture) {
                // 1.  Check local storage for selected culture.
                if (culture) {
                    if (callback) {
                        callback(culture);
                    } else {
                        return culture;
                    }
                } else {
                    // 2.  Check server for specific file.
                    $.get('/api/culture',function (culture) {
                        cache.set_text('current_culture', culture);
                        if (callback) {
                            callback(culture);
                        } else {
                            return culture;
                        }
                    }).fail(function () {
                            if (window.culture) {
                                if (callback) {
                                    callback(window.culture);
                                } else {
                                    return window.culture;
                                }
                            } else {
                                if (callback) {
                                    callback('en-US');
                                } else {
                                    return 'en-US';
                                }
                            }
                        });
                }
            });
        }
    };

    var set_culture = function (new_culture) {
        get_culture(function (current_culture) {
            if (new_culture !== current_culture) {
                require(['postal'], function (postal) {
                    var loc_channel = postal.channel("i18n");
                    for (var i = 0; i < window.mod_list.length; i++) {
                        var key = window.mod_list[i][0];
                        var localize = window.mod_list[i][1];
                        if (localize) {
                            loc_channel.publish(key, new_culture);
                        }
                    }
                    window.culture = new_culture;
                    var cache = new bog.cache();
                    cache.set_text('current_culture', new_culture);
                });
            } else {
                console.log('attempting to change culture to the current culture');
            }
        });
    };
    return {
        get_module_text: get_module_text,
        get_culture: get_culture,
        set_culture: set_culture
    };
};