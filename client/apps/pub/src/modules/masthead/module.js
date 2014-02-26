define([
    'jquery',
    'underscore',
    'backbone',

    'bog',

    'text!./masthead.html'
],
    function ($, _, Backbone, bog, module_layout) {
        return Backbone.View.extend({
            initialize: function (vars) {
                var self = this;
                self.render(vars).localize();
            },
            render: function (vars) {
                var self = this;
                var rendered_layout = _.template(module_layout, { module_title: vars.title, module_description: vars.description });
                self.$el.append(rendered_layout);
                return this;
            },
            localize: function () {
                return this;
            }
        });
    });