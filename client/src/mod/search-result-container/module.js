define([ 'postal', 'module_base', 'text!./container.html', 'text!./no-results.html' ],
    function (postal, mod_base, module_layout, result_layout, no_result_layout) {
        return mod_base.extend({
            api_root: "/api/mod/search-results-container",
            template_root: "/modules/search-result-container",
            results_data: [],
            results_markup: [],
            initialize: function (el, o, callback) {
                var self = this;
                self.base_initialize(el, o, function () {
                    self.render(module_layout, window.culture, function () {
                        postal.subscribe({
                            channel: self.manifest.pubsub.data_channel_id,
                            topic: self.manifest.pubsub.data_topic,
                            callback: function (data) {
                                self.search_results(self.results, data);
                            }
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
                    self.results_markup = $(rendered_layout).children("#search-results");
                    if (callback) {
                        callback(self);
                    }
                });
            },
            search_results: function (container, data) {
                var self = this;
                self.results_markup.empty();
                if (!data || data.length === 0) {
                    var no_result_markup = _.template(no_result_layout, {result: null});
                    self.results_markup.append(no_result_markup);
                } else {
                    for (var i = 0; i < data.length; i++) {
                        var result = data[i];
                        switch (result.entity) {
                            case 'event':
                                console.log(0);
                                self.render_result(self.template_root + '/event-1.html', result);
                                break;
                            case 'donation':
                                console.log(1);
                                self.render_result(self.template_root + '/donation-1.html', result);
                                break;
                            case 'solicitation':
                                console.log(2);
                                self.render_result(self.template_root + '/solicitation-1.html', result);
                                break;
                            default:
                                console.log(3);
                                self.render_result(self.template_root + '/event-1.html', result);
                                break;
                        }
                    }
                }
            },
            render_result: function (layout_uri, result) {
                var self = this;
                require(['text!' + layout_uri], function (layout) {
                    var result_markup = _.template(layout, {result: result});
                    self.results_markup.append(result_markup);
                });
            }
        });
    });