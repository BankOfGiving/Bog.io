define([
    'jquery',
    'underscore',
    'backbone',
    'bog',

    'text!./mod-search-result.html'
],
    function ($, _, Backbone, bog, module_layout) {
        return Backbone.View.extend({
            initialize: function (options) {
                var self = this;
                self.render(options).localize();
            },
            render: function (options) {
                var self = this;
                var rendered_layout = _.template(module_layout, { module: options.options });
                $(self.el).append(rendered_layout);
                return this;
            },
            localize: function () {
                return this;
            }
        });
    });