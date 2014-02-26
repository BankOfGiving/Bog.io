define([ 'module_base', 'text!./ad-static.html' ], function (mod_base, module_layout) {
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
            self.__render_template(module_layout, function () {
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