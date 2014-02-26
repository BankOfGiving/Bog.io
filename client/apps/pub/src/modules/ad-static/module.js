define([
    'jquery',
    'underscore',
    'backbone',

    'bog',

    'text!./ad-static.html'
],
    function ($, _, Backbone, bog, module_layout) {
        return Backbone.View.extend({
            modules: null,
            initialize: function (vars) {
                var self = this;
                self.render(vars).localize();
            },
            render: function (vars) {
                var self = this;

                var container = self.$el.append(module_layout);
                if (typeof vars.class !== 'undefined' && vars.class !== '') {
                    container.addClass(vars.class);
                }
                var titleSpan = container.children().children("#col-title");
                titleSpan.text(vars.title);

                self.modules = container.children().children("#col-mod-container");
                return this;
            },
            localize: function () {
                return this;
            }
        });
    });