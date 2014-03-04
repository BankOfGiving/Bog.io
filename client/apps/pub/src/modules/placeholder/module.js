define([ 'module_base', 'text!./placeholder.html' ], function (mod_base, module_layout) {
    return mod_base.extend({
        api_root: "/api/mod/placeholder",
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