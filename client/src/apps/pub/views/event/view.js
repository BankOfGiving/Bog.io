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
                $.getJSON("/api/event/" + id)
                    .done(function (data) {
                        self.data_channel.publish("event", data);
                    })
                    .fail(function () {
                        self.publish_debug(e);
                    });
            }
        });
    });