define([ 'postal', 'view_base', 'text!./manifest.json' ],
    function (postal, view_base, manifest_text) {
        return view_base.extend({
            initialize: function (el, id) {
                var self = this;
                var event_id = id;
                var manifest = JSON.parse(manifest_text);
                self.base_initialize(el, manifest, function () {
                    self.base_render(manifest, null, function () {
                        self.publish_view_data(event_id);
                    });
                });
            },
            publish_view_data: function (id) {
                var self = this;
                console.log("/api/data/event/" + id);
                $.getJSON("/api/data/event/" + id)
                    .done(function (data, envelope) {
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