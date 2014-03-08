define([ 'jquery', 'underscore', 'backbone', 'postal', 'bog', 'text!./modules/module-wrapper/mod-wrapper.html' ],
    function ($, _, Backbone, postal, bog, module_wrapper_layout) {
        return Backbone.View.extend({
            api_root: null,
            data_channel: null,
            debug_channel: null,
            key: null,
            loc_channel: null,
            manifest: {},
            template: null,
            base_initialize: function (el, manifest, callback) {
                var self = this;
                if (!self.el) {
                    throw 'Invalid root element.  Template needs a mount point.';
                }
                if (self.$el.length === 0) {
                    throw 'Invalid root element (el). Template needs a mount point.';
                }

                self.culture = "en-US";
                self.$el = el;
                self.__parse_manifest(manifest, function () {
                    self.__init_pubsub();
                    if (!self.render) {
                        // If there is no custom render function, call the base render.
                        self.base_render(function () {
                            if (callback) {
                                callback();
                            }
                        });
                    } else {
                        // return to module to continue rendering.
                        if (callback) {
                            callback();
                        }
                    }
                });
            },
            base_render: function (template, culture, callback) {
                var self = this;
                self.template = template;

                // Render wrapper div immediately.
                var mod_wrapper = document.getElementById(self.key);
                if (mod_wrapper) {
                    mod_wrapper = $(mod_wrapper).empty();
                    mod_wrapper.html(module_wrapper_layout);
                } else {
                    mod_wrapper = $(module_wrapper_layout);
                    self.$el.append(mod_wrapper);
                }

                mod_wrapper.attr("id", self.key);
                mod_wrapper.attr("data-culture", culture);

                // Continue loading rest of module.
                var rendered_template = _.template(template, {
                    title: self.manifest.title,
                    description: self.manifest.description,
                    module: self.manifest.options
                });

                mod_wrapper.append(rendered_template);

                if (self.manifest.localize) {
                    if (!culture) {
                        culture = self.manifest.culture;
                    }
                    self.__get_localized_markup(mod_wrapper, culture, self.key, function (localized_markup) {
                        var title_element = $(localized_markup).find('.module-wrapper-title');
                        var desc_element = $(localized_markup).find('.module-wrapper-description');
                        if (title_element && title_element.html() !== '') {
                            title_element.attr('style', 'display: block;');
                        } else {
                            title_element.attr('style', 'display: none;');
                        }
                        if (desc_element && desc_element.html() !== '') {
                            desc_element.attr('style', 'display: block;');
                        } else {
                            desc_element.attr('style', 'display: none;');
                        }
                        if (callback) {
                            callback(localized_markup);
                        }
                    });
                } else {
                    if (callback) {
                        callback(mod_wrapper);
                    }
                }
            },
            publish_debug: function (e) {
                var self = this;
                var json_manifest = JSON.stringify(self.manifest);
                if (self.debug_channel) {
                    self.debug_channel.publish({
                        channel: 'debug',
                        topic: 'module-view',
                        data: e,
                        module_manifest: json_manifest
                    });
                } else {
                    console.log(e);
                }
                return self;
            },

            __get_text: function (culture, key, callback) {
                var self = this;
                var cache = new bog.cache();
                var loc_key = culture + '.' + key;
                cache.get_json(loc_key, function (loc_text) {
                    // 1.  Check local storage for specific text.
                    if (loc_text) {
                        callback(loc_text);
                    } else {
                        // 2.  Check server for specific text.
                        $.getJSON(self.api_root + '/text/' + loc_key, function (loc_text) {
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
                                            $.getJSON(self.api_root + '/text/' + loc_key, function (loc_text) {
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
            },
            __get_localized_markup: function (markup, culture, key, callback) {
                var self = this;
                if (!markup) {
                    throw 'Invalid markup';
                }
                if (culture) {
                    self.__get_text(culture, key, function (loc_text) {
                        if (loc_text) {
                            self.__render_markup(markup, loc_text, function (localized_markup) {
                                callback(localized_markup);
                            });
                        } else {
                            // No text available.  Return markup.
                            callback(markup);
                        }
                    });
                } else {
                    var i18n = new bog.i18n();
                    // Determine culture
                    i18n.get_culture(function (culture) {   // 'en-US';  // TODO: detect culture
                        if (!culture) {
                            throw 'invalid culture';
                        }
                        self.__get_text(culture, key, function (loc_text) {
                            if (loc_text) {
                                self.__render_markup(markup, loc_text, function (localized_markup) {
                                    callback(localized_markup);
                                });
                            } else {
                                // No text available.  Return markup.
                                callback(markup);
                            }
                        });
                    });
                }
            },
            __init_pubsub: function () {
                var self = this;
                if (self.manifest.pubsub) {
                    // PUBSUB Channel for Data
                    if (self.manifest.pubsub.data_channel_id && self.manifest.pubsub.data_channel_id !== '') {
                        self.data_channel = postal.channel(self.manifest.pubsub.data_channel_id);
                    } else {
                        if (self.manifest.app && self.manifest.app !== '') {
                            self.data_channel = postal.channel(self.manifest.app);
                        } else {
                            self.publish_debug('No data channel available.');
                        }
                    }
                    // PUBSUB Channel for Localization
                    if (self.manifest.pubsub.loc_channel_id && self.manifest.pubsub.loc_channel_id !== '') {
                        self.loc_channel = postal.channel(self.manifest.pubsub.loc_channel_id);
                    } else {
                        self.loc_channel = postal.channel('i18n');
                    }
                    if (self.loc_channel) {
                        self.loc_channel.subscribe('set-culture', function (culture, envelope) {
                            if (self.localize) {
                                self.base_render(self.template, culture);
                            }
                        });
                    }

                    // PUBSUB Channel for Debug
                    if (self.manifest.pubsub.debug_channel_id && self.manifest.pubsub.debug_channel_id !== '') {
                        self.debug_channel = postal.channel(self.manifest.pubsub.debug_channel_id);
                    } else {
                        self.debug_channel = postal.channel('debug');
                    }
                } else {
                    self.publish_debug('No pubsub set for this module.');
                }
                return this;
            },
            __parse_manifest: function (manifest, callback) {
                var self = this;
                if (!manifest) {
                    throw 'Invalid manifest';
                }
                if (!manifest.app && manifest.app !== '') {
                    throw 'Invalid application specified.';
                }
                if (!manifest.mod_type && manifest.mod_type !== '') {
                    throw 'Invalid module type specified.';
                }
                if (!manifest.uid && manifest.uid !== '') {
                    throw 'Invalid module type specified.';
                }

                self.manifest = manifest;
                self.app = self.manifest.app;
                self.mod_type = self.manifest.mod_type;
                if (self.manifest.uid === '') {
                    self.uid = Math.floor((Math.random() * 10000000) + 1);
                } else {
                    self.uid = self.manifest.uid;
                }

                self.localize = self.manifest.localize;
                if (self.uid && self.uid !== '') {
                    self.key = self.app + '.' + 'mod.' + self.mod_type + '.' + self.uid;
                } else {
                    self.key = self.app + '.' + 'mod.' + self.mod_type;
                }
                callback();
            },
            __render_markup: function (markup, l10n_dictionary, callback) {
                var self = this;
                var rendered_markup = $(markup);
                var show_placeholder = false;
                var placeholder_text = '[][][][][][][][][][][][]';

                $.each(rendered_markup.find("[data-localize-key]"), function (index, element) {
                    var loc_key = element.getAttribute("data-localize-key");
                    var loc_target = element.getAttribute("data-localize-target");

                    if (l10n_dictionary) {
                        var key_text = self.__value_by_string(loc_key, l10n_dictionary);
                        switch (loc_target) {
                            case 'text':
                                if (key_text) {
                                    element.innerText = key_text;
                                } else {
                                    if (show_placeholder) element.innerText = placeholder_text;
                                }
                                break;
                            case 'html':
                                if (key_text) {
                                    element.innerHTML = key_text;
                                } else {
                                    if (show_placeholder) element.innerHTML = placeholder_text;
                                }
                                break;
                            case 'button':
                                $(element).text(key_text.label);
                                $(element).attr('title', key_text.tooltip);
                                break;
                            case 'form-group':
                                $(element).children('label').text(key_text.label);
                                $(element).children('input').attr('placeholder', key_text.placeholder);
                                break;
                        }
                    } else {
                        if (show_placeholder) {
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
                    }
                });
                callback(rendered_markup);
            },
            __value_by_string: function (s, o) {
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
            }
        });
    });