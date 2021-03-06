define([ 'postal', 'module_base', 'text!./mod-search-form-horiz.html', 'text!./mod-search-form-vert.html' ],
    function (postal, mod_base, module_layout_horiz, module_layout_vert) {
        return mod_base.extend({
            api_root: "/api/mod/search-form",
            initialize: function (el, o, callback) {
                var self = this;
                _.bindAll(self, 'search', 'load_view_data');

                self.base_initialize(el, o, function () {
                    self.load_view_data(function () {
                        var module_template = module_layout_vert;
                        if (self.manifest.options.orientation === 'horiz') {
                            module_template = module_layout_horiz;
                        }
                        self.base_render(module_template, window.culture, function () {
                            if (callback) {
                                callback(self);
                            }
                        });
                    });
                });
            },
            events: {
                "click #btn_submit_search": "search_event"
            },
            load_view_data: function (callback) {
                var self = this;
                $.getJSON(self.api_root + '/' + self.key, function (data) {
                    self.manifest.options.view_data = data;
                })
                    .done(function () {
                        callback();
                    })
                    .fail(function () {
                        console.log("error");
                    });
            },
            search_event: function (e) {
                e.preventDefault();

                var self = this;
                var search_filter = {
                    type: $('#search_type').val(),
                    text: $('#search_text').val()
                };
                self.search(search_filter);
            },
            localize: function () {
                return this;
            },
            search: function (search_filter) {
                var self = this;
                $.post(self.api_root + '/', { "search_filter": search_filter }, "json")
                    .done(function (data) {
                        self.data_channel.publish(self.manifest.pubsub.data_topic, data);
                    })
                    .fail(function () {
                        self.publish_debug(e);
                    });
            }
        });
    });