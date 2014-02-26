define([
    'module_view',
    'text!./mod-social.html'
],
    function (mod_base, module_layout) {
        return mod_base.extend({
            initialize: function (el, o) {
                var self = this;
                self.__init(el, o);
                self.render().localize();
                return self;
            },
            render: function () {
                var self = this;
                self.__render_template(module_layout);
                return this;
            },
            localize: function () {

            }
        });
    });