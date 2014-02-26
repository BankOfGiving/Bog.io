define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'postal',

    'bog',

    'text!./layout.html',

    'modules/column-container/module',
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
    function ($, _, Backbone, bs, postal, bog, view_layout, column_container_module, //map_module,
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

                // render home layout
                self.$el.empty();
                self.$el.append(view_layout);

                var title_bar = new titlebar_module({ el: '#titlebar' });

                var masthead = new masthead_module({ el: '#masthead', title: 'Events', description: 'Find an event.' });

                // Build Left Column
                var current_col;
                var col_one_container = new column_container_module({ el: '#column-one', title: '-', class: ''});
                current_col = col_one_container;
                new nav_module({ el: current_col.modules, nav: bog.site.getContentNavigation() });
                new separator_module({ el: current_col.modules });
                new social_module({ el: current_col.modules });
                new separator_module({ el: current_col.modules });
                new text_module({ el: current_col.modules });

                var col_two_container = new column_container_module({ el: '#column-two', title: '-'});
                current_col = col_two_container;
                var search_form = new search_form_module({ el: current_col.modules, title: 'Search', orientation: 'horiz' });

                var col_three_container = new column_container_module({ el: '#column-three', title: '-'});
                current_col = col_three_container;
                // new placeholder_module({ el: current_col.modules, height: 500, width: 250 });

                // subscript to search results
                channel.subscribe("search.results.all", function (data) {
                    self.search_results(col_two_container.modules, search_form, data);
                });

                return this;
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
            search_results: function (container, search_form, data) {
                container.empty();
                container.append(search_form);
                var search_result_options = {
                    title: '',
                    description: '',
                    total_results: data.length
                };

                for (var i = 0; i < data.length; i++) {
                    search_result_options.result = data[i];
                    search_result_options.result_count = i + 1;
                    //new search_result_module({ el: container, options: search_result_options });
                }
            }
        });
    });