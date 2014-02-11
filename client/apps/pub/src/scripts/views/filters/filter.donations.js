define([
    'jquery',
    'underscore',
    'backbone',
    'blockui',
    'text!../../../templates/filters/filter.donations.html'
], function ($, _, Backbone, blockui, template) {
    return Backbone.View.extend({
        render: function (container) {
            container.html(template);
        }
    });
});