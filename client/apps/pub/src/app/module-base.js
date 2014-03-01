define([ 'jquery', 'underscore', 'backbone', 'postal', 'bog' ],
    function ($, _, Backbone, postal, bog) {
        return Backbone.View.extend({
            manifest: {},
            template: null,
            data_channel: null,
            loc_channel: null,
            debug_channel: null,
            key: null,
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
                    self.__init_debug();
                    self.__init_l10n();
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
                    $(mod_wrapper).empty();
                } else {
                    mod_wrapper = document.createElement('div');
                    mod_wrapper.className = "'module-wrapper";
                    mod_wrapper.id = self.key;
                    mod_wrapper.setAttribute("data-culture", culture);
                    self.$el.append(mod_wrapper);
                }

                mod_wrapper.setAttribute("data-culture", culture);

                // Continue loading rest of module.
                var rendered_template = _.template(template, {
                    title: self.manifest.title,
                    description: self.manifest.description,
                    module: self.manifest.options
                });

                if (self.manifest.localize) {
                    if (!culture) {
                        culture = self.manifest.culture;
                    }
                    var i18n = new bog.i18n();
                    i18n.get_module_markup(rendered_template, culture, self.key, function (localized_markup) {
                        $(mod_wrapper).append(localized_markup);
                        if (callback) {
                            callback(mod_wrapper);
                        }
                    });
                } else {
                    $(mod_wrapper).append(rendered_template);
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
            __init_debug: function () {
                var self = this;
                self.on('all', function (e) {
                    self.publish_debug(e);
                });
                return self;
            },
            __init_l10n: function () {
                var self = this;
                self.loc_channel.subscribe('set-culture', function (culture, envelope) {
                    if (self.localize) {
                        self.base_render(self.template, culture);
                    }
                });
                self.loc_channel.subscribe(self.key, function (culture) {
                    console.log('RENDER NEW CULTURE:  ' + culture);
                    if (self.render) {
                        self.render();
                    } else {
                        self.base_render(self.template, culture);
                    }
                });
                return self;
            },
            __parse_manifest: function (manifest, callback) {
                var self = this;
                if (self.__validate_manifest(manifest)) {
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
                }
            },
            __validate_manifest: function (manifest) {
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
                return this;
            }
        });
    });