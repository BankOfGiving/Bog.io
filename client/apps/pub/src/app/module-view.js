define([ 'jquery', 'underscore', 'backbone', 'postal', 'bog' ],
    function ($, _, Backbone, postal, bog) {
        return Backbone.View.extend({
            manifest: {},
            data_channel: null,
            loc_channel: null,
            debug_channel: null,
            module_key: null,

            __init: function (el, manifest) {
                var self = this;
                self.$el = el;
                self.__parse_manifest(manifest, function () {
                    self.__init_pubsub();
                    self.__init_debug();
                    self.__init_l10n();
                });

                return this;
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
                            self.__publish_debug('No data channel available.');
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
                    // PUBSUB Channel for Debug
                    if (self.manifest.pubsub.debug_channel_id && self.manifest.pubsub.debug_channel_id !== '') {
                        self.debug_channel = postal.channel(self.manifest.pubsub.debug_channel_id);
                    } else {
                        self.debug_channel = postal.channel('debug');
                    }
                } else {
                    console.log('No pubsub set for this module.');
                }
                return this;
            },
            __init_debug: function () {
                var self = this;
                self.on('all', function (e) {
                    self.__publish_debug(e);
                });
                self.on('render', function (e) {
                    self.__publish_debug(e);
                });
                self.trigger('__init', self.manifest);
                return this;
            },
            __init_l10n: function () {
                this.loc_channel.subscribe(this.key, function () {
                    throw "NEW LOCALIZATION DATA!!!!";
                });
            },
            __publish_debug: function (e) {
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
                return this;
            },
            __validate_manifest: function (manifest) {
                if (!this.el) {
                    throw 'Invalid root element.  Template needs a mount point.';
                }
                if (this.$el.length === 0) {
                    throw 'Invalid root element (el). Template needs a mount point.';
                }
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
            },
            __parse_manifest: function (manifest, callback) {
                var self = this;
                if (self.__validate_manifest(manifest)) {
                    self.manifest = manifest;
                    self.app = self.manifest.app;
                    self.mod_type = self.manifest.mod_type;
                    self.uid = self.manifest.uid;
                    self.key = self.app + '.' + 'mod.' + self.mod_type + '.' + self.uid;
                    callback();
                }
            },
            __render_template: function (template, localize, callback) {
                // Render wrapper div immediately.
                var mod_wrapper = document.createElement('div');
                mod_wrapper.setAttribute('class', 'module-wrapper');
                this.$el.append(mod_wrapper);

                // Continue loading rest of module.
                var self = this;
                var rendered_template = _.template(template, {
                    title: self.manifest.title,
                    description: self.manifest.description,
                    module: self.manifest.options
                });
                self.module_key =
                    self.manifest.app + '.' +
                        'mod.' +
                        self.manifest.mod_type + '.' +
                        self.manifest.uid;

                try {
                    // Tag the module container
                    mod_wrapper.setAttribute('id', self.module_key);
                } catch (e) {
                    self.__publish_debug(e);
                }

                if (localize) {
                    var i18n = new bog.i18n();
                    i18n.localize_markup(rendered_template, null, self.key, function (localized_markup) {
                        $(mod_wrapper).append(localized_markup);
                        if (callback) {
                            callback(localized_markup);
                        }
                    });
                } else {
                    $(mod_wrapper).append(rendered_template);
                    if (callback) {
                        callback(rendered_template);
                    }
                }
            }
        });
    });