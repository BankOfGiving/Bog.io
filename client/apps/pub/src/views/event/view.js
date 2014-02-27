define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',

    'bog',

    'text!./layout.html',

    'domain/events/event_collection',
    'domain/events/event_model',
    'domain/event_types/event_type_model',

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
    function ($, _, Backbone, bs, bog, view_layout, event_collection, event_model, event_type_model, column_container_module, //map_module,
              masthead_module, nav_module, placeholder_module, search_form_module, search_result_module, separator_module, social_module, text_module, titlebar_module) {
        return Backbone.View.extend({
            initialize: function () {
                var self = this;
                _.bindAll(self, 'logout');
                self.render();
            },
            render: function () {
                var self = this;

                // render home layout
                self.$el.empty();
                self.$el.append(view_layout);

                var title_bar = new titlebar_module({ el: '#home-titlebar' });
                var masthead = new masthead_module({ el: '#home-masthead', title: 'Events', description: 'Join others in your community spread the gift of giving.' });

                // Build Left Column
                var current_col;
                var col_one_container = new column_container_module({ el: '#column-one', title: '-', class: 'dfkljhsdfkjsdfhksdfjh'});
                current_col = col_one_container;
                new nav_module({ el: current_col.modules, nav: bog.site.getContentNavigation() });
                new separator_module({ el: current_col.modules });
                new social_module({ el: current_col.modules });
                new separator_module({ el: current_col.modules });
                new text_module({ el: current_col.modules });


                var col_two_container = new column_container_module({ el: '#column-two', title: 'Find Events'});
                current_col = col_two_container;

                new search_form_module({ el: current_col.modules, title: '', orientation: 'horiz' });
                // Create Search Results for the main column
                var eventCollection = new event_collection();
                eventCollection.fetch({
                    success: function (data) {
                        data.each(function (event_model) {
                            new search_result_module({ el: col_two_container.modules, result: event_model });
                        });
                    },
                    error: function () {
                        console.log('error');
                    }
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
            }
        });
    });