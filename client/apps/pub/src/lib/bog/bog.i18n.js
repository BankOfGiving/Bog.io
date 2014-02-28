if (!bog) {
    var bog = {};
}
bog.i18n = function () {
    var get_localization_text = function (culture, key, callback) {
        var cache = new bog.cache();
        var loc_key = culture.replace('-', '_') + '.' + key;
        cache.get_json(loc_key, function (loc_text) {
            // 1.  Check local storage for specific text.
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

    var get_current_culture = function (callback) {
        if (window.current_culture) {
            if (callback) {
                callback(window.current_culture);
            } else {
                return window.current_culture;
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
                    $.get('/api/i18n/culture', function (culture) {
                        cache.set_text('current_culture', culture);
                        if (callback) {
                            callback(culture);
                        } else {
                            return culture;
                        }
                    }).fail(function () {
                            if (window.current_culture) {
                                if (callback) {
                                    callback(window.current_culture);
                                } else {
                                    return window.current_culture;
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

    var localize_markup = function (markup, culture, key, callback) {
        if (!markup) {
            // throw 'Invalid markup';
        }
        if (culture) {
            get_localization_text(culture, key, function (loc_text) {
                if (loc_text) {
                    __render_localized_markup(markup, loc_text, function (localized_markup) {
                        callback(localized_markup);
                    });
                } else {
                    // No text available.  Return markup.
                    callback(markup);
                }
            });
        } else {
            // Determine culture
            get_current_culture(function (culture) {   // 'en-US';  // TODO: detect culture
                if (!culture) {
                    throw 'invalid culture';
                } else {
                    culture = culture.replace('-', '_');
                }

                get_localization_text(culture, key, function (loc_text) {
                    if (loc_text) {
                        __render_localized_markup(markup, loc_text, function (localized_markup) {
                            callback(localized_markup);
                        });
                    } else {
                        // No text available.  Return markup.
                        callback(markup);
                    }
                });
            });
        }
    };

    var __render_localized_markup = function (markup, l10n_dictionary, callback) {
        var self = this;
        var rendered_markup = $(markup);

        $.each(rendered_markup.find("[data-localize-key]"), function (index, element) {
            var loc_key = element.getAttribute("data-localize-key");
            var loc_target = element.getAttribute("data-localize-target");

            if (l10n_dictionary) {
                var key_text = __value_by_string(loc_key, l10n_dictionary);
                switch (loc_target) {
                    case 'text':
                        element.innerText = key_text;
                        break;
                    case 'html':
                        element.innerHTML = key_text;
                        break;
                    case 'form-group':
                        $(element).children('label').text(key_text.label);
                        $(element).children('input').attr('placeholder', key_text.placeholder);
                        break;
                }
            } else {
                // show placeholder text
                switch (loc_target) {
                    case 'text':
                        element.innerText = '[][][][][][][][][][][][]';
                        break;
                    case 'html':
                        element.innerHTML = '[][][][][][][][][][][][]';
                        break;
                    case 'form-group':
                        $(element).children('label').text('[][][][][][][][][][][][]');
                        $(element).children('input').attr('placeholder', '[][][][][][][][][][][][]');
                        break;
                }
            }
        });
        callback(rendered_markup);
    };

    var __value_by_string = function (s, o) {
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

    var __change_culture = function (new_culture) {
        get_current_culture(function (current_culture) {
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
                    window.current_culture = new_culture;
                    var cache = new bog.cache();
                    cache.set_text('current_culture', new_culture);
                });
            } else {
                console.log('attempting to change culture to the current culture');
            }
        });
    };

    return {
        get_markup: localize_markup,
        get_text: get_localization_text,
        get_culture: get_current_culture,
        set_culture: __change_culture
    };
};