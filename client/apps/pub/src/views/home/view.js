define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'postal',

    'bog',

    'text!./layout.html',

    'modules/column-container/module',
    'modules/debug/module',
    //'modules/map/module',
    'modules/masthead/module',
    'modules/nav/module',
    'modules/placeholder/module',
    'modules/search-form/module',
    'modules/search-result/module',
    'modules/separator/module',
    'modules/social/module',
    'modules/text/module',
    'modules/titlebar/module'
],
    function ($, _, Backbone, bs, postal, bog, view_layout, column_container_module, debug_module, //map_module,
              masthead_module, nav_module, placeholder_module, search_form_module, search_result_module, separator_module, social_module, text_module, titlebar_module) {
        return Backbone.View.extend({
            initialize: function () {
                var self = this;
                _.bindAll(self, 'logout');
                self.render();
            },
            render: function () {
                var self = this;
                var channel = postal.channel('pub');
                var site = new bog.site();

                // GENERATE MODULE MANIFESTS
                var module_manifest_template = function () {
                    return {
                        app: 'pub',
                        mod_type: '',
                        uid: '',
                        title: '',
                        description: '',
                        localize: true,
                        pubsub: {
                            data_channel_id: '',
                            data_topic: '',
                            loc_channel_id: '',
                            loc_topic: ''
                        },
                        options: {}
                    };
                };
                // ---------------------------------------------------------------------------------------------------------
                var masthead_manifest = new module_manifest_template();
                masthead_manifest.mod_type = 'masthead';
                masthead_manifest.uid = 'home_header';
                // ---------------------------------------------------------------------------------------------------------
                var left_nav_manifest = new module_manifest_template();
                left_nav_manifest.mod_type = 'nav';
                left_nav_manifest.uid = 'home_nav_left';
                left_nav_manifest.options = {
                    nav: site.getContentNavigation()
                };
                // ---------------------------------------------------------------------------------------------------------
                var social_link_manifest = new module_manifest_template();
                social_link_manifest.mod_type = 'social_links';
                social_link_manifest.uid = 'home_social_links';
                social_link_manifest.localize = false;
                social_link_manifest.options = {
                    networks: [
                        { type: 'facebook', uri: '', icon: '' },
                        { type: 'twitter', uri: '', icon: '' },
                        { type: 'linkedin', uri: '', icon: '' },
                        { type: 'pinterest', uri: '', icon: '' }
                    ]
                };
                // ---------------------------------------------------------------------------------------------------------
                var news_module_manifest = new module_manifest_template();
                news_module_manifest.mod_type = 'text';
                news_module_manifest.uid = 'home_news';
                news_module_manifest.title = 'NEWS!!!';
                news_module_manifest.description = 'Static text module';
                news_module_manifest.options = {
                    text: 'This is an example of overriding text with the manifest.'
                };
                // ---------------------------------------------------------------------------------------------------------
                var center_placeholder_manifest = new module_manifest_template();
                center_placeholder_manifest.mod_type = 'placeholder';
                center_placeholder_manifest.uid = 'home_center_placeholder';
                center_placeholder_manifest.localize = false;
                center_placeholder_manifest.options = {
                    height: '150',
                    width: '650'
                };
                // ---------------------------------------------------------------------------------------------------------
                var separator_manifest = new module_manifest_template();
                separator_manifest.localize = false;
                separator_manifest.mod_type = 'separator';
                // ---------------------------------------------------------------------------------------------------------
                var search_form_manifest = new module_manifest_template();
                search_form_manifest.mod_type = 'search_form';
                search_form_manifest.uid = 'home_search_form';
                search_form_manifest.pubsub.data_channel_id = 'pub';
                search_form_manifest.pubsub.data_topic = 'search.results.all';
                search_form_manifest.options = {
                    search_types: [],
                    orientation: 'vert'
                };
                // ---------------------------------------------------------------------------------------------------------
                var search_results_placeholder_manifest = new module_manifest_template();
                search_results_placeholder_manifest.mod_type = 'text';
                search_results_placeholder_manifest.uid = 'search_results_placeholder';
                search_results_placeholder_manifest.options = { };
                // ---------------------------------------------------------------------------------------------------------
                var latestinfo_manifest = new module_manifest_template();
                latestinfo_manifest.mod_type = 'text';
                latestinfo_manifest.uid = 'latest_info';
                latestinfo_manifest.options = {};
                // ---------------------------------------------------------------------------------------------------------
                var ads_module_manifest = new module_manifest_template();
                ads_module_manifest.mod_type = 'text';
                ads_module_manifest.uid = 'home_ads_right';
                ads_module_manifest.options = {
                    text: 'Ad rotator'
                };
                // ---------------------------------------------------------------------------------------------------------

                // render home layout
                self.$el.empty();
                self.$el.append(view_layout);
                // ---------------------------------------------------------------------------------------------------------

                var title_bar = new titlebar_module({ el: '#titlebar' });

                // ---------------------------------------------------------------------------------------------------------
                self.append_module(masthead_module, '#masthead', masthead_manifest);

                // ---------------------------------------------------------------------------------------------------------
                var debug_panel = new debug_module({ el: '#debug' });
                // ---------------------------------------------------------------------------------------------------------

                // ---------------------------------------------------------------------------------------------------------
                // Column one
                var col_one_container = new column_container_module({ el: '#column-one', title: '-', class: 'sdsadasdadasd'});
                // ---------------------------------------------------------------------------------------------------------
                self.append_module(nav_module, col_one_container.modules, left_nav_manifest);
                // ---------------------------------------------------------------------------------------------------------
                self.append_module(separator_module, col_one_container.modules, separator_manifest);
                // ---------------------------------------------------------------------------------------------------------
                self.append_module(social_module, col_one_container.modules, social_link_manifest);
                // ---------------------------------------------------------------------------------------------------------
                self.append_module(separator_module, col_one_container.modules, separator_manifest);
                // ---------------------------------------------------------------------------------------------------------
                self.append_module(text_module, col_one_container.modules, news_module_manifest);
                // ---------------------------------------------------------------------------------------------------------
                // Column two
                // ---------------------------------------------------------------------------------------------------------
                var col_two_container = new column_container_module({ el: '#column-two', title: '-'});
                // ---------------------------------------------------------------------------------------------------------
                self.append_module(text_module, col_two_container.modules, search_results_placeholder_manifest);
                self.append_module(placeholder_module, col_two_container.modules, center_placeholder_manifest);
                // ---------------------------------------------------------------------------------------------------------
                var search_result_container = col_two_container.modules;
                // ---------------------------------------------------------------------------------------------------------
                // Column three
                var col_three_container = new column_container_module({ el: '#column-three', title: '-'});
                // ---------------------------------------------------------------------------------------------------------
                self.append_module(search_form_module, col_three_container.modules, search_form_manifest);
                // ---------------------------------------------------------------------------------------------------------
                self.append_module(text_module, col_three_container.modules, latestinfo_manifest);
                // ---------------------------------------------------------------------------------------------------------
                self.append_module(text_module, col_three_container.modules, ads_module_manifest);
                // ---------------------------------------------------------------------------------------------------------
                channel.subscribe("search.results.all", function (data) {
                    self.search_results(search_result_container, data);
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
            },
            search_results: function (container, data) {
                container.empty();
                var search_result_options = {
                    title: '',
                    description: '',
                    total_results: data.length
                };

                for (var i = 0; i < data.length; i++) {
                    search_result_options.result = data[i];
                    search_result_options.result_count = i + 1;
                    new search_result_module({ el: container, options: search_result_options });
                }
            }
        });
    });