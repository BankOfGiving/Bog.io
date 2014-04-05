define([
    'jquery',
    '../../../../../.',
    'backbone',
    'bootstrap',
    'postal',

    'bog',

    'text!./layout.html',

    'modules/ad-static/module',
    'modules/column-container/module',
    'modules/debug/module',
    //'modules/map/module',
    'modules/map/module',
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
    function ($, _, Backbone, bs, postal, bog, view_layout, ad_static_module, column_container_module, debug_module, map_module, masthead_module, nav_module, placeholder_module, search_form_module, search_result_module, separator_module, social_module, text_module, titlebar_module) {
        return Backbone.View.extend({
            initialize: function () {
                this.render();
            },
            render: function () {
                var self = this;

                var modules = new bog.modules();

                // render home layout
                self.$el.empty();
                self.$el.append(view_layout);
                // -----------------------------------------------------------------------------------------------------
                var titlebar_manifest = new mod_util.manifest();
                titlebar_manifest.mod_type = 'titlebar';
                titlebar_manifest.uid = 'titlebar';
                self.append_module(titlebar_module, '#titlebar', titlebar_manifest);
                // -----------------------------------------------------------------------------------------------------
                var masthead_manifest = new mod_util.manifest();
                masthead_manifest.mod_type = 'masthead';
                masthead_manifest.uid = 'events';
                self.append_module(masthead_module, '#masthead', masthead_manifest);
                // -----------------------------------------------------------------------------------------------------
                var debug_module_manifest = new mod_util.manifest();
                debug_module_manifest.mod_type = 'debug';
                self.append_module(debug_module, '#debug', debug_module_manifest);
                // -----------------------------------------------------------------------------------------------------
                // Column one
                // -----------------------------------------------------------------------------------------------------
                var left_column_manifest = new mod_util.manifest();
                left_column_manifest.mod_type = 'column';
                left_column_manifest.localize = false;
                left_column_manifest.uid = 'left-column';
                self.append_module(column_container_module, '#column-one', left_column_manifest, function (column) {
                    // -------------------------------------------------------------------------------------------------
                    var left_nav_manifest = new mod_util.manifest();
                    left_nav_manifest.mod_type = 'nav';
                    left_nav_manifest.uid = 'nav-left';
                    self.append_module(nav_module, column.modules, left_nav_manifest, function () {
                        // ---------------------------------------------------------------------------------------------
//                        var separator_manifest = new mod_util.manifest();
//                        separator_manifest.localize = false;
//                        separator_manifest.mod_type = 'separator';
//                        self.append_module(separator_module, column.modules, separator_manifest, function () {
//                            // -----------------------------------------------------------------------------------------
//                            var social_link_manifest = new mod_util.manifest();
//                            social_link_manifest.mod_type = 'social-links';
//                            social_link_manifest.localize = false;
//                            social_link_manifest.options = {
//                                networks: [
//                                    { type: 'facebook', uri: '', icon: '' },
//                                    { type: 'twitter', uri: '', icon: '' },
//                                    { type: 'linkedin', uri: '', icon: '' },
//                                    { type: 'pinterest', uri: '', icon: '' }
//                                ]
//                            };
//                            self.append_module(social_module, column.modules, social_link_manifest, function () {
//                                var separator_manifest = new mod_util.manifest();
//                                separator_manifest.localize = false;
//                                separator_manifest.mod_type = 'separator';
//                                self.append_module(separator_module, column.modules, separator_manifest, function () {
//                                    // ---------------------------------------------------------------------------------
//                                    var news_module_manifest = new mod_util.manifest();
//                                    news_module_manifest.mod_type = 'text';
//                                    news_module_manifest.uid = 'news-static';
//                                    news_module_manifest.title = 'NEWS!!!';
//                                    news_module_manifest.description = 'Static text module';
//                                    news_module_manifest.options = {
//                                        text: 'This is an example of overriding text with the manifest.'
//                                    };
//                                    self.append_module(text_module, column.modules, news_module_manifest);
//                                });
//                            });
//                        });
                    });
                });
                // -----------------------------------------------------------------------------------------------------
                // Column two
                // -----------------------------------------------------------------------------------------------------
                var center_column_manifest = new mod_util.manifest();
                center_column_manifest.mod_type = 'column';
                center_column_manifest.localize = false;
                center_column_manifest.uid = 'center-column';
                self.append_module(column_container_module, '#column-two', center_column_manifest, function (column) {
                    // -------------------------------------------------------------------------------------------------
                    var map_manifest = new mod_util.manifest();
                    map_manifest.mod_type = 'map';
                    map_manifest.uid = 'map-events';
                    map_manifest.localize = false;
                    map_manifest.pubsub.data_channel_id = 'pub';
                    map_manifest.pubsub.data_topic = 'search.results.events';
                    self.append_module(map_module, column.modules, map_manifest, function () {
                        // -------------------------------------------------------------------------------------------------
                        var search_form_manifest = new mod_util.manifest();
                        search_form_manifest.mod_type = 'search-form';
                        search_form_manifest.uid = 'search-form-events';
                        search_form_manifest.pubsub.data_channel_id = 'pub';
                        search_form_manifest.pubsub.data_topic = 'search.results.events';
                        search_form_manifest.options = {
                            orientation: 'horiz'
                        };
                        self.append_module(search_form_module, column.modules, search_form_manifest);
                    });
                });
                // -----------------------------------------------------------------------------------------------------
                // Column three
                // -----------------------------------------------------------------------------------------------------
                var right_column_manifest = new mod_util.manifest();
                right_column_manifest.mod_type = 'column';
                right_column_manifest.localize = false;
                right_column_manifest.uid = 'right-column';
                self.append_module(column_container_module, '#column-three', right_column_manifest, function (column) {
                    // -------------------------------------------------------------------------------------------------
                    var search_results_manifest = new mod_util.manifest();
                    search_results_manifest.mod_type = 'search-results-container';
                    search_results_manifest.uid = 'search-results-all';
                    search_results_manifest.pubsub.data_topic = 'search.results.events';
                    self.append_module(search_result_module, column.modules, search_results_manifest);
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
            },
            localize: function () {
                i18n.localizeView(this.$el, 'pub_home');
            },
            events: {
                "click #Logout": "logout"
            },
            logout: function () {
                $.get(api.uri.auth.logout);
                window.location.href = "/";
            },
            load_column: function (manifest) {
                // Build a loader for column modules
            }
        });
    });