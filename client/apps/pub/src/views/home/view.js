define([ 'view_base', 'text!./manifest.json' ],
    function (view_base, manifest_text) {
        return view_base.extend({
            initialize: function (el) {
                var self = this;
                var manifest = JSON.parse(manifest_text);
                self.base_initialize(el, manifest, function () {
                    self.base_render(manifest, null);
                });
            }
        });
    });