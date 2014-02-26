define([
    'postal',

    'module_base',

    'domain/events/event_collection',
    'domain/events/event_model',

    'domain/event_types/event_type_collection',
    'domain/event_types/event_type_model',

    'text!./mod-search-form-horiz.html',
    'text!./mod-search-form-vert.html'
],
    function (postal, mod_base, event_collection, event_model, event_type_collection, event_type_model, module_layout_horiz, module_layout_vert) {
        return mod_base.extend({
            initialize: function (el, o, callback) {
                var self = this;
                self.__init(el, o);
                _.bindAll(self, 'search', 'load_view_data');

                self.load_view_data(function () {
                    if (callback) {
                        self.render(function () {
                            callback(self);
                        });
                    } else {
                        self.render();
                    }
                });
            },
            render: function (callback) {
                var self = this;
                var mod_template;
                if (self.manifest.options.orientation == 'vert') {
                    mod_template = module_layout_vert;
                } else {
                    mod_template = module_layout_horiz;
                }
                self.__render_template(mod_template, function () {
                    if (callback) {
                        callback(self);
                    } else {
                        return self;
                    }
                });
            },
            events: {
                "click #btn_submit_search": "search"
            },
            load_view_data: function (callback) {
                var self = this;
                var event_types = new event_type_collection();
                event_types.fetch({
                    success: function (data) {
                        self.manifest.options.search_types = data.toJSON();
                        return callback();
                    },
                    error: function (e) {
                        console.log('error');
                        throw e;
                    }
                });
            },
            search: function (e) {
                e.preventDefault();

                var self = this;
                var eventCollection = new event_collection();

                eventCollection.filter = {
                    type: $('#search_type').val(),
                    text: 'test'
                };
                eventCollection.fetch({
                    success: function (data) {
                        self.data_channel.publish(self.manifest.pubsub.data_topic, data.toJSON());
                    },
                    error: function () {
                        console.log('error');
                    }
                });
            },
            localize: function () {
                return this;
            }
        });
    });