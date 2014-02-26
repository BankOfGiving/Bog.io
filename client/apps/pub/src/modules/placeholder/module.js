define([ 'module_base', 'text!./placeholder.html' ], function (mod_base, module_layout) {
    return mod_base.extend({
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
            self.__render_module(module_layout, window.current_culture, function () {
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