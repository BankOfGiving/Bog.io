define(['module_base'], function (mod_base) {
    return mod_base.extend({
        api_root: "/api/mod/button-bar",
        template_root: "/modules/button-bar/",
        initialize: function (el, o, callback) {
            var self = this;
            self.base_initialize(el, o, function () {
                if (!self.manifest.options.layout) {
                    throw "Invalid layout specified.";
                }
                require(['text!' + self.template_root + self.manifest.options.layout + '.html'], function (layout) {
                    self.base_render(layout, window.culture, function () {
                        if (callback) {
                            callback(self);
                        }
                    });
                });
            });
        }
    });
});