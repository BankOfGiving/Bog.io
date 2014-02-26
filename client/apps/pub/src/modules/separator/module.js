define([
    'jquery',
    'underscore',
    'backbone'
],
    function ($, _, Backbone) {
        return Backbone.View.extend({
            initialize: function (vars) {
                var self = this;
                self.render(vars);
            },
            render: function () {
                var self = this;
                self.$el.append("<hr />");
                return this;
            },
            localize: function () {
                return this;
            }
        });
    });