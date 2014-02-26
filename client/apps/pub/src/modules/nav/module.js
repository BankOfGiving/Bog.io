define([ 'jquery', 'underscore', 'backbone', 'module_view', 'bog', 'text!./mod-nav-vert.html' ],
    function ($, _, Backbone, mod_base, bog, module_layout) {
        return mod_base.extend({ initialize: function (el, o, callback) {
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
                self.__render_template(module_layout, true, function () {
                    if (callback) {
                        callback(self);
                    } else {
                        return self;
                    }
                });

                return self;
            },
            localize: function () {
                return this;
            }
        });
    });