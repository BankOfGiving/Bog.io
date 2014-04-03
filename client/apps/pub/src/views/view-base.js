define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'postal',
    'require',
],
    function ($, _, Backbone, bs, postal, require) {
        return Backbone.View.extend({
            base_initialize: function (el, manifest, callback) {
                var self = this;

                self.__parse_manifest(manifest, function (manifest) {

                    require(['text!../../layouts/' + manifest.layout + '.html'], function (layout) {
                        self.layout = layout;
                        if (!self.render) {
                            // If there is no custom render function, call the base render.

                            self.base_render(layout, manifest, function () {
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
                });
            },
            base_render: function (manifest, layout, callback) {
                var self = this;
                // if not custom layour is specified, use the value from the manifest.
                if (!layout) {
                    if (!self.layout || self.layout === '') {
                        throw 'No view layout specified.';
                    } else {
                        layout = self.layout;
                    }
                }
                self.$el.empty();
                self.$el.append(layout);
                for (var i = 0; i < manifest.modules.length; i++) {
                    var mod_manifest = manifest.modules[i];
                    mod_manifest.app = manifest.app;
                    self.__process_module(mod_manifest);
                    if (i === manifest.modules.length) {
                        // return to module to continue rendering.
                        if (callback) {
                            callback();
                        } else {
                            return self;
                        }
                    }
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
                if (!manifest.view && manifest.view !== '') {
                    throw 'Invalid view name specified.';
                }
                if (!manifest.layout && manifest.layout !== '') {
                    throw 'Invalid layout specified.';
                }
                self.manifest = manifest;
                self.app = self.manifest.app;
                self.view = self.manifest.view;
                self.layout = self.manifest.layout;
                callback(manifest);
            },
            __process_module: function (manifest) {
                var self = this;
                require(['modules/' + manifest.mod_type + '/module'], function (mod) {
                    var container = $('#zone-' + manifest.zone);
                    new mod(container, manifest, function (module_instance) {
                        if (module_instance) {
                            self.__register_view_module(module_instance.key, manifest.localize);
                        }
                    });
                });
            },
            __register_view_module: function (key, localize) {
                // Registering the module with the page's module array, it ensures that localization only runs for
                // active modules.  This is also an entry point to gather metrics on the raw usage.
                window.mod_list.push([key, localize]);
                postal.publish({
                    channel: 'debug',
                    topic: 'module-register',
                    data: window.mod_list
                });
                return key;
            }
        });
    });