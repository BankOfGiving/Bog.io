define(['module_base'], function (mod_base) {
    return mod_base.extend({
        api_root: "/api/mod/nav",
        template_root: "/modules/nav/",
        initialize: function (el, o, callback) {
            var self = this;
            _.bindAll(self, 'load_view_data');
            self.base_initialize(el, o, function () {
                if (!self.manifest.options.layout) {
                    throw "Invalid layout specified.";
                }
                require(['text!' + self.template_root + self.manifest.options.layout + '.html'], function (layout) {
                    self.load_view_data(function () {
                        self.base_render(layout, window.culture, function () {
                            var route = Backbone.history.fragment;
                            var current_nav = self.$el.find('[data-fragment="' + route + '"]');
                            if (current_nav) {
                                current_nav.addClass("active");
                            }
                            if (callback) {
                                callback(self);
                            }
                        });
                    });
                });
            });
        },
        load_view_data: function (callback) {
            var self = this;
            $.getJSON(self.api_root + '/' + self.key, function (data) {
                self.manifest.options.nav = data;
            })
                .done(function () {
                    callback();
                })
                .fail(function () {
                    console.log("error");
                });
        }
    });
});