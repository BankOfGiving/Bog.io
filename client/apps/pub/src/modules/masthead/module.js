define([ 'module_base', 'text!./masthead.html' ], function (mod_base, module_layout) {
    return mod_base.extend({
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