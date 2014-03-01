define([ 'module_base', 'text!./col-container.html' ], function (mod_base, module_layout) {
    return mod_base.extend({
        modules: [],
        initialize: function (el, o, callback) {
            var self = this;
            self.base_initialize(el, o, function () {
                self.render(module_layout, window.current_culture, function (self) {
                    if (callback) {
                        callback(self);
                    }
                });
            });
        },
        render: function (template, culture, callback) {
            var self = this;
            self.base_render(template, culture, function (rendered_layout) {
                self.modules = $(rendered_layout).children().children("#col-mod-container");
                if (callback) {
                    callback(self);
                }
            });
        }
    });
});