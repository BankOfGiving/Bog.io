define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'postal',
    'require',

    'bog',

    'text!./manifest.json'
],
    function ($, _, Backbone, bs, postal, require, bog, view_manifest_text) {
        return Backbone.View.extend({
            initialize: function () {
                var self = this;
                var view_manifest = JSON.parse(view_manifest_text);
                require(['text!../../layouts/' + view_manifest.layout + '.html'], function (view_layout) {
                    self.render(view_layout, view_manifest);
                });
            },
            render: function (view_layout, manifest) {
                var self = this;
                self.$el.empty();
                self.$el.append(view_layout);
                for (var i = 0; i < manifest.modules.length; i++) {
                    var mod_manifest = manifest.modules[i];
                    mod_manifest.app = manifest.app;
                    self.process_module(mod_manifest);
                }
                return this;
            },
            process_module: function (manifest) {
                var self = this;
                require(['modules/' + manifest.mod_type + '/module'], function (mod) {
                    var container = $('#zone-' + manifest.zone);
                    new mod(container, manifest, function (module_instance) {
                        if (module_instance) {
                            self.register_view_module(module_instance.key, manifest.localize);
                        }
                    });
                });
            },
            register_view_module: function (key, localize) {
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