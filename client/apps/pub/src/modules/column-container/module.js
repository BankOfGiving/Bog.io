define([
    'jquery',
    'underscore',
    'backbone',
    'bog',

    'text!./col-container.html'
],
    function ($, _, Backbone, bog, module_layout) {
        return Backbone.View.extend({
            modules: null,
            initialize: function (options) {
                var self = this;
                self.render(options).localize();
            },
            render: function (options) {
                var self = this;

                var container = self.$el.append(module_layout);
                if (typeof options.class !== 'undefined' && options.class !== '') {
                    container.addClass(options.class);
                }
                var titleSpan = container.children().children("#col-title");
                titleSpan.text(options.title);

                self.modules = container.children().children("#col-mod-container");
                return this;
            },
            localize: function () {
                return this;
            }
        });
    });