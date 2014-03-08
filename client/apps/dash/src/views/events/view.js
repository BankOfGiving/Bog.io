define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'postal',

    'bog',

    'text!./layout.html',

    'modules/ad-static/module',
    'modules/column-container/module',
    'modules/data-summary/module',
    'modules/debug/module',
    //'modules/map/module',
    'modules/markup/module',
    'modules/masthead/module',
    'modules/nav/module',
    'modules/placeholder/module',
    'modules/search-form/module',
    'modules/search-result-container/module',
    'modules/separator/module',
    'modules/social/module',
    'modules/text/module',
    'modules/titlebar/module'
],
    function ($, _, Backbone, bs, postal, bog, view_layout, ad_static_module, column_container_module, data_summary_module, debug_module, markup_module, masthead_module, nav_module, placeholder_module, search_form_module, search_result_module, separator_module, social_module, text_module, titlebar_module) {
        return Backbone.View.extend({
            initialize: function () {
                this.render();
            },
            module_manifest_template: function () {
                return {
                    app: 'dash',
                    mod_type: '',
                    uid: '',
                    title: '',
                    description: '',
                    culture: '',
                    localize: true,
                    pubsub: {
                        data_channel_id: '',
                        data_topic: '',
                        loc_channel_id: '',
                        loc_topic: ''
                    },
                    options: {}
                };
            },
            render: function () {
                var self = this;

                // render home layout
                self.$el.empty();
                self.$el.append(view_layout);
                // -----------------------------------------------------------------------------------------------------
                var titlebar_manifest = new self.module_manifest_template();
                titlebar_manifest.mod_type = 'titlebar';
                titlebar_manifest.uid = 'primary';
                self.append_module(titlebar_module, '#titlebar', titlebar_manifest);
                // -----------------------------------------------------------------------------------------------------
                var masthead_manifest = new self.module_manifest_template();
                masthead_manifest.mod_type = 'masthead';
                masthead_manifest.uid = 'events';
                self.append_module(masthead_module, '#masthead', masthead_manifest);
                // -----------------------------------------------------------------------------------------------------
                var debug_module_manifest = new self.module_manifest_template();
                debug_module_manifest.mod_type = 'debug';
                self.append_module(debug_module, '#debug', debug_module_manifest);
                // -----------------------------------------------------------------------------------------------------
                // Column one
                // -----------------------------------------------------------------------------------------------------
                var left_column_manifest = new self.module_manifest_template();
                left_column_manifest.mod_type = 'column';
                left_column_manifest.localize = false;
                left_column_manifest.uid = 'left';
                self.append_module(column_container_module, '#column-one', left_column_manifest, function (column) {
                    // -------------------------------------------------------------------------------------------------
                    var left_nav_manifest = new self.module_manifest_template();
                    left_nav_manifest.mod_type = 'nav';
                    left_nav_manifest.uid = 'left';
                    self.append_module(nav_module, column.modules, left_nav_manifest, function () {
                        // ---------------------------------------------------------------------------------------------
                        var separator_manifest = new self.module_manifest_template();
                        separator_manifest.localize = false;
                        separator_manifest.mod_type = 'separator';
                        self.append_module(separator_module, column.modules, separator_manifest, function () {
                            // -----------------------------------------------------------------------------------------
                            var social_link_manifest = new self.module_manifest_template();
                            social_link_manifest.mod_type = 'social';
                            social_link_manifest.uid = 'links';
                            social_link_manifest.localize = false;
                            social_link_manifest.options = {
                                networks: [
                                    { type: 'facebook', uri: '', icon: '' },
                                    { type: 'twitter', uri: '', icon: '' },
                                    { type: 'linkedin', uri: '', icon: '' },
                                    { type: 'pinterest', uri: '', icon: '' }
                                ]
                            };
                            self.append_module(social_module, column.modules, social_link_manifest, function () {
                                var separator_manifest = new self.module_manifest_template();
                                separator_manifest.mod_type = 'separator';
                                separator_manifest.localize = false;
                                self.append_module(separator_module, column.modules, separator_manifest);
                            });
                        });
                    });
                });
                // -----------------------------------------------------------------------------------------------------
                // Column two
                // -----------------------------------------------------------------------------------------------------
                var center_column_manifest = new self.module_manifest_template();
                center_column_manifest.mod_type = 'column';
                center_column_manifest.localize = false;
                center_column_manifest.uid = 'center-column';
                self.append_module(column_container_module, '#column-two', center_column_manifest, function (column) {
                    // -------------------------------------------------------------------------------------------------
                    var add_event_intro_manifest = new self.module_manifest_template();
                    add_event_intro_manifest.mod_type = 'markup';
                    add_event_intro_manifest.uid = 'add-event-intro';
                    add_event_intro_manifest.options = { src: "add-event-intro.html"};
                    self.append_module(markup_module, column.modules, add_event_intro_manifest);
                });
                return this;
            },
            append_module: function (module, container, manifest, callback) {
                var self = this;
                new module($(container), manifest, function (module_instance) {
                    if (module_instance) {
                        self.register_view_module(module_instance.key, manifest.localize);
                        if (callback) {
                            callback(module_instance);
                        } else {
                            return module_instance;
                        }
                    }
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