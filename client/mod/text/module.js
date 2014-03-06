define([ 'module_base', 'text!./mod-text.html' ], function (mod_base, module_layout) {
    return mod_base.extend({
        api_root: "/api/mod/text",
        initialize: function (el, o, callback) {
            var self = this;
            self.base_initialize(el, o, function () {
                self.base_render(module_layout, window.current_culture, function (self) {
                    if (callback) {
                        callback(self);
                    }
                });
            });
        }
    });
});