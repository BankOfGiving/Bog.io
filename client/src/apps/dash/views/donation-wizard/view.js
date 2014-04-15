define([ 'postal', 'view_base', 'text!./manifest.json' ],
    function (postal, view_base, manifest_text) {
        return view_base.extend({
            initialize: function (args) {
                var self = this;
                var step = args.step;
                var model = args.model || {
                    "this": "is",
                    "a": "test",
                    "of": "router",
                    "data": "persistence",
                    "version": 1
                };

                var manifest = JSON.parse(manifest_text);
                self.base_initialize(self.el, manifest, function () {
                    self.base_render(manifest, null, function () {
                        setTimeout(function () {
                            postal.publish({
                                channel: "dash",
                                topic: "donation-wizard",
                                data: {
                                    "step": step,
                                    "model": model
                                }
                            });
                        }, 500);
                    });
                });
            }
        });
    });