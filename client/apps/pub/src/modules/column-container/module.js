define([ 'module_base', 'text!./col-container.html' ], function (mod_base, module_layout) {
    return mod_base.extend({
        modules: [],
        initialize: function (el, o, callback) {
            this.__init(el, o).render(function (self) {
                if (callback) {
                    callback(self);
                } else {
                    return self;
                }
            });
        },
        render: function (callback) {
            var self = this;
            self.__render_module(module_layout, window.current_culture, function (rendered_layout) {
                self.modules = $(rendered_layout).children().children("#col-mod-container");
                if (callback) {
                    callback(self);
                } else {
                    return self;
                }
            });

            return self;
        }
    });
});