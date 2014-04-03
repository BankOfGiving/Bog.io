define([ 'module_base', 'text!./layout-full.html', 'text!./detail.html'],
    function (mod_base, module_layout, result_layout) {
        return mod_base.extend({
            api_root: "/api/mod/event-display",
            results: [],
            initialize: function (el, o, callback) {
                var self = this;
                self.base_initialize(el, o, function () {
                    self.render(module_layout, window.culture, function () {
                        self.data_channel.subscribe(self.manifest.pubsub.data_topic, function (data) {
                            self.search_results(self.results, data);
                        });
                        if (callback) {
                            callback(self);
                        }
                    });
                });
            },
            render: function (template, culture, callback) {
                var self = this;
                self.base_render(template, culture, function (rendered_layout) {
                    if (callback) {
                        callback(self);
                    }
                });
            },
            search_results: function (container, data) {
                var self = this;
                self.results.empty();
                if (!data || data.length === 0) {
                    var no_result_markup = _.template(no_result_layout, {result: null});
                    self.results.append(no_result_markup);
                } else {
                    console.log(data[i]);
                    var result_markup = _.template(result_layout, {result: data[i]});
                    self.results.append(result_markup);
                }
            }
        });
    });