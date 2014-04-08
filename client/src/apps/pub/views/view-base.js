define([
    'jquery',
    'underscorejs',
    'backbone',
    'bootstrap',
    'postal',
    'require'
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
                self.__process_manifest(manifest);
                if (callback) {
                    callback(self);
                } else {
                    return this;
                }
            },
            __process_manifest: function (manifest) {
                var self = this;
                var app = manifest.app;
                var i, mod_key, mod_manifest;

                for (i = 0; i < manifest.modules.length; i++) {
                    mod_manifest = manifest.modules[i];
                    mod_manifest.app = app;
                    mod_key = mod_manifest.app + mod_manifest.mod_type + mod_manifest.uid + mod_manifest.zone;
                    var container = $('#zone-' + mod_manifest.zone);
                    var temp_container_id = i + mod_key;
                    container.append("<div id=\"" + temp_container_id + "\"></div>");
                    mod_manifest.container_id = temp_container_id;
                    var temp_container = $("#" + mod_manifest.container_id);
                    self.__process_module(mod_manifest, temp_container);
                }
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
            __process_module: function (manifest, container, callback) {
                // In order to render modules in the order they're listed in the manifest, we place a temp container
                // into the DOM to mark the position.  The render can then run asynchronously and maintain its order.
                var self = this;
                //console.log(container);
                require(['modules/' + manifest.mod_type + '/module'], function (mod) {
                    self.__render_module(mod, container, manifest, callback);
                });
            },
            __render_module: function (mod, container, manifest, callback) {
                // Executes the module runner script and appends to the container.
                var self = this;
                new mod(container, manifest, function (module_instance) {
                    if (module_instance) {
                        self.__register_view_module(module_instance.key, manifest.localize);
                        if (callback) {
                            callback();
                        } else {
                            return true;
                        }
                    }
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