define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'postal',
    'require',

    'bog',

    'text!./manifest.json',
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

                // -----------------------------------------------------------------------------------------------------
                // ZONE 0
                // -----------------------------------------------------------------------------------------------------
//                var titlebar_manifest = new mod_util.manifest();
//                titlebar_manifest.localize = false;
//                titlebar_manifest.mod_type = 'titlebar';
//                titlebar_manifest.uid = 'titlebar';
//                self.append_module(titlebar_module, '#zone-0', titlebar_manifest);
//                // -----------------------------------------------------------------------------------------------------
//                // ZONE 1
//                // -----------------------------------------------------------------------------------------------------
//                var masthead_manifest = new mod_util.manifest();
//                masthead_manifest.localize = false;
//                masthead_manifest.mod_type = 'masthead';
//                masthead_manifest.uid = 'home';
//                self.append_module(masthead_module, '#zone-1', masthead_manifest);
//
//                var carousel_manifest = new mod_util.manifest();
//                carousel_manifest.localize = false;
//                carousel_manifest.mod_type = 'placeholder';
//                carousel_manifest.uid = 'carousel';
//                carousel_manifest.options = {
//                    height: 480,
//                    width: 800
//                };
//                self.append_module(placeholder_module, '#zone-1', carousel_manifest);
                // -----------------------------------------------------------------------------------------------------
                // ZONE 2
                // -----------------------------------------------------------------------------------------------------
                /*                var event_info_manifest = new mod_util.manifest();
                 event_info_manifest.mod_type = 'masthead';
                 event_info_manifest.uid = 'home';
                 event_info_manifest.options.markup = "events information!!!!";
                 self.append_module(markup_module, '#zone-2', event_info_manifest);*/
                // -----------------------------------------------------------------------------------------------------
                // ZONE 3
                // -----------------------------------------------------------------------------------------------------
                /*                var donation_info_manifest = new mod_util.manifest();
                 donation_info_manifest.mod_type = 'masthead';
                 donation_info_manifest.uid = 'home';
                 donation_info_manifest.options.markup = "donations information!!!!";
                 self.append_module(markup_module, '#zone-3', donation_info_manifest);*/
                // -----------------------------------------------------------------------------------------------------
                // ZONE 4
                // -----------------------------------------------------------------------------------------------------
                /*                var solicitations_info_manifest = new mod_util.manifest();
                 solicitations_info_manifest.mod_type = 'masthead';
                 solicitations_info_manifest.uid = 'home';
                 solicitations_info_manifest.options.markup = "solicitations information!!!!";
                 self.append_module(markup_module, '#zone-4', solicitations_info_manifest);*/


                return this;
            },
            process_module: function (manifest) {
                var self = this;
                require(['modules/' + manifest.mod_type + '/module'], function (mod) {
                    var container = $('#zone-' + manifest.zone);
                    console.log(container);
                    new mod(container, manifest, function (module_instance) {
                        if (module_instance) {
                            self.register_view_module(module_instance.key, manifest.localize);
//                            if (callback !== 'undefined') {
//                                return module_instance;
//                            } else {
//                                callback(module_instance);
//                            }
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