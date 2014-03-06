define([ 'module_base', 'text!./mod-nav-vert.html' ], function (mod_base, module_layout) {
    return mod_base.extend({
        api_root: "/api/mod/nav",
        initialize: function (el, o, callback) {
            var self = this;
            _.bindAll(self, 'load_view_data');

            self.base_initialize(el, o, function () {
                console.log(1);
                self.load_view_data(function () {
                    console.log(2);
                    self.base_render(module_layout, window.current_culture, function (self) {
                        console.log(3);
                        if (callback) {
                            callback(self);
                        }
                    });
                });
            });
        },
        load_view_data: function (callback) {
            var self = this;

            console.log(self.api_root + '/' + self.key);
            $.getJSON(self.api_root + '/' + self.key, function (data) {
                console.log(data);
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