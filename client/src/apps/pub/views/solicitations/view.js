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
    'modules/debug/module',
    //'modules/map/module',
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
    function ($, _, Backbone, bs, postal, bog, view_layout, ad_static_module, column_container_module, debug_module, masthead_module, nav_module, placeholder_module, search_form_module, search_result_module, separator_module, social_module, text_module, titlebar_module) {
        return Backbone.View.extend({
            initialize: function () {
                var self = this;
                _.bindAll(self, 'logout');
                self.render();
            },
            module_manifest_template: function () {
                return {
                    app: 'pub',
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
                titlebar_manifest.uid = 'home_titlebar';
                self.append_module(titlebar_module, '#titlebar', titlebar_manifest);
                // -----------------------------------------------------------------------------------------------------
                var masthead_manifest = new self.module_manifest_template();
                masthead_manifest.mod_type = 'masthead';
                masthead_manifest.uid = 'home_header';
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
                left_column_manifest.uid = 'home_left_column';
                self.append_module(column_container_module, '#column-one', left_column_manifest, function (column) {
                    // -------------------------------------------------------------------------------------------------
                    var left_nav_manifest = new self.module_manifest_template();
                    left_nav_manifest.mod_type = 'nav';
                    left_nav_manifest.uid = 'home_nav_left';
                    self.append_module(nav_module, column.modules, left_nav_manifest, function () {
                        // ---------------------------------------------------------------------------------------------
                        var separator_manifest = new self.module_manifest_template();
                        separator_manifest.localize = false;
                        separator_manifest.mod_type = 'separator';
                        self.append_module(separator_module, column.modules, separator_manifest, function () {
                            // -----------------------------------------------------------------------------------------
                            var social_link_manifest = new self.module_manifest_template();
                            social_link_manifest.mod_type = 'social_links';
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
                                separator_manifest.localize = false;
                                separator_manifest.mod_type = 'separator';
                                self.append_module(separator_module, column.modules, separator_manifest, function () {
                                    // ---------------------------------------------------------------------------------
                                    var news_module_manifest = new self.module_manifest_template();
                                    news_module_manifest.mod_type = 'text';
                                    news_module_manifest.uid = 'home_news';
                                    news_module_manifest.title = 'NEWS!!!';
                                    news_module_manifest.description = 'Static text module';
                                    news_module_manifest.options = {
                                        text: 'This is an example of overriding text with the manifest.'
                                    };
                                    self.append_module(text_module, column.modules, news_module_manifest);
                                });
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
                center_column_manifest.uid = 'home_center_column';
                self.append_module(column_container_module, '#column-two', center_column_manifest, function (column) {
                    // ---------------------------------------------------------------------------------------------
                    var solicitation_intro_manifest = new self.module_manifest_template();
                    solicitation_intro_manifest.mod_type = 'text';
                    solicitation_intro_manifest.uid = 'solicitation_intro';
                    self.append_module(text_module, column.modules, solicitation_intro_manifest);
                    // -------------------------------------------------------------------------------------------------
                    /*var search_results_manifest = new self.module_manifest_template();
                     search_results_manifest.mod_type = 'search-results-container';
                     search_results_manifest.uid = 'home_search_results';
                     search_results_manifest.options = { };
                     self.append_module(search_result_module, column.modules, search_results_manifest, function (results_container) {
                     // ---------------------------------------------------------------------------------------------
                     var search_results_placeholder_manifest = new self.module_manifest_template();
                     search_results_placeholder_manifest.mod_type = 'text';
                     search_results_placeholder_manifest.uid = 'search_results_placeholder';
                     search_results_placeholder_manifest.options = { };
                     self.append_module(text_module, results_container.results, search_results_placeholder_manifest, function () {
                     // ---------------------------------------------------------------------------------------------
                     var center_placeholder_manifest = new self.module_manifest_template();
                     center_placeholder_manifest.mod_type = 'placeholder';
                     center_placeholder_manifest.uid = 'home_center_placeholder';
                     center_placeholder_manifest.localize = false;
                     center_placeholder_manifest.options = {
                     height: '150',
                     width: '620'
                     };
                     self.append_module(placeholder_module, results_container.results, center_placeholder_manifest);
                     });
                     });*/
                });
                // -----------------------------------------------------------------------------------------------------
                // Column three
                // -----------------------------------------------------------------------------------------------------
                var right_column_manifest = new self.module_manifest_template();
                right_column_manifest.mod_type = 'column';
                right_column_manifest.localize = false;
                right_column_manifest.uid = 'home_right_column';
                self.append_module(column_container_module, '#column-three', right_column_manifest, function (column) {
                    var search_form_manifest = new self.module_manifest_template();
                    search_form_manifest.mod_type = 'search_form';
                    search_form_manifest.uid = 'home_search_form';
                    search_form_manifest.pubsub.data_channel_id = 'pub';
                    search_form_manifest.pubsub.data_topic = 'search.results.all';
                    search_form_manifest.options = {
                        search_types: [],
                        orientation: 'vert'
                    };
                    self.append_module(search_form_module, column.modules, search_form_manifest, function () {
                        // -------------------------------------------------------------------------------------------------
                        var latestinfo_manifest = new self.module_manifest_template();
                        latestinfo_manifest.mod_type = 'text';
                        latestinfo_manifest.uid = 'latest_info';
                        latestinfo_manifest.options = {};
                        self.append_module(text_module, column.modules, latestinfo_manifest, function () {
                            // ---------------------------------------------------------------------------------------------
                            var ads_module_manifest = new self.module_manifest_template();
                            ads_module_manifest.mod_type = 'ad-static';
                            ads_module_manifest.uid = 'home_ads_right';
                            ads_module_manifest.options = {};
                            self.append_module(ad_static_module, column.modules, ads_module_manifest);
                        });
                    });
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