define([ 'postal', 'module_base'],
    function (postal, mod_base) {
        return mod_base.extend({
            api_root: "/api/mod/donation-display",
            results: [],
            initialize: function (el, o, callback) {
                var self = this;
                self.base_initialize(el, o, function () {
                    require(['text!/modules/donation-display/' + self.manifest.layout + '.html'], function (layout) {
                        postal.subscribe({
                            channel: self.manifest.pubsub.data_channel_id,
                            topic: self.manifest.pubsub.data_topic,
                            callback: function (data) {
                                self.manifest.options.model = data;
                                self.render(layout, window.culture);
                            }
                        });
                    });
                    if (callback) {
                        callback(self);
                    }
                });
            },
            render: function (template, culture, callback) {
                var self = this;
                self.base_render(template, culture, function () {
                    if (callback) {
                        callback(self);
                    }
                });
            }
            /*            search_results: function (container, data) {
             alert(data);
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
             }*/
        });
    });