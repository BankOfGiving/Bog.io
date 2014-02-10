define([
    'jquery',
    'underscore',
    'backbone',
    'blockui',
    'text!../../../tmpl/filters/filter.donations.html'
], function ($, _, Backbone, blockui, template) {
    return Backbone.View.extend({
        render: function (container) {
            container.html(template);
        }
    });
});