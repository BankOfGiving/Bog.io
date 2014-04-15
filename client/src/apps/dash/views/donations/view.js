define([ 'postal', 'view_base', 'text!./manifest.json' ],
    function (postal, view_base, manifest_text) {
        return view_base.extend({
            initialize: function (el) {
                var self = this;
                var manifest = JSON.parse(manifest_text);
                self.base_initialize(el, manifest, function () {
                    self.base_render(manifest, null, function () {
                        self.__publish_view_data();
                    });
                });
            },
            __publish_view_data: function () {
                var self = this;
                if (self.manifest.initial_set) {
                    var search_filter = {};
                    if (self.manifest.initial_set.entity) {
                        search_filter.entity = self.manifest.initial_set.entity;
                    }
                    if (self.manifest.initial_set.search_type) {
                        search_filter.type = self.manifest.initial_set.search_type;
                    }
                    if (self.manifest.initial_set.search_text) {
                        search_filter.text = self.manifest.initial_set.search_text;
                    }
                    if (self.manifest.initial_set.sort_key) {
                        search_filter.sort_key = self.manifest.initial_set.sort_key;
                    }
                    if (self.manifest.initial_set.sort_dir) {
                        search_filter.sort_dir = self.manifest.initial_set.sort_dir;
                    }

                    $.post(self.manifest.data_api, { "search_filter": search_filter }, "json")
                        .done(function (data) {
                            console.log(data);
                            setTimeout(function () {
                                postal.publish({
                                    channel: self.manifest.pubsub.data_channel_id,
                                    topic: self.manifest.pubsub.data_topic,
                                    data: data
                                });
                            }, 10);  // pause to allow page to render.  TODO find safe way to handle this.
                        })
                        .fail(function (e) {
                            self.publish_debug(e);
                        });
                }
            },
            events: {
                "click #btn-donation-create": "create_donation"
            },
            create_donation: function (e) {
                e.preventDefault();
                window.location.href = '#/donations/create/1a05c520';
            }
        });
    });