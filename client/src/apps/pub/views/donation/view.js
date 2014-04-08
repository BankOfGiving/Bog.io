define([ 'postal', 'view_base', 'text!./manifest.json' ],
    function (postal, view_base, manifest_text) {
        return view_base.extend({
            initialize: function (el, id) {
                var self = this;
                var manifest = JSON.parse(manifest_text);
                self.base_initialize(el, manifest, function () {
                    self.base_render(manifest, null, function () {
                        self.publish_view_data(id);
                    });
                });
            },

            publish_view_data: function (id) {
                var self = this;
                $.getJSON(self.manifest.data_api + id)
                    .done(function (data) {
                        setTimeout(function () {
                            postal.publish({
                                channel: self.manifest.pubsub.data_channel_id,
                                topic: self.manifest.pubsub.data_topic,
                                data: data
                            });
                        }, 1000);  // pause to allow page to render.  TODO find safe way to handle this.

                    })
                    .fail(function (e) {
                        console.log(e);
                    });
            }
        });
    });