define([ 'module_base', 'text!./container.html', 'text!./no-results.html' ],
    function (mod_base, module_layout, result_layout, no_result_layout) {
        return mod_base.extend({
            api_root: "/api/mod/search-results-container",
            template_root: "/modules/search-result-container",
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
                    self.results = $(rendered_layout).children("#search-results");
                    if (callback) {
                        callback(self);
                    }
                });
            },
            search_results: function (container, data) {
                var self = this;
                console.log(data);
                self.results.empty();
                if (!data || data.length === 0) {
                    var no_result_markup = _.template(no_result_layout, {result: null});
                    self.results.append(no_result_markup);
                } else {
                    for (var i = 0; i < data.length; i++) {
                        var result = data[i];
                        switch (result.entity) {
                            case 'event':
                                self.render_result(self.template_root + '/event-1.html', result);
                                break;
                            case 'donation':
                                self.render_result(self.template_root + '/donation-1.html', result);
                                break;
                            case 'solicitation':
                                self.render_result(self.template_root + '/solicitation-1.html', result);
                                break;
                            default:
                                self.render_result(self.template_root + '/event-1.html', result);
                                break;
                        }
                    }
                }
            },
            render_result: function (result, layout_uri) {
                require(['text!' + layout_uri], function (layout) {
                    var result_markup = _.template(layout, {result: result});
                    self.results.append(result_markup);
                });
            }
        });
    });