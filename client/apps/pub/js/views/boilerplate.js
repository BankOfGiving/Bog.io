define([
    'jquery',
    'underscore',
    'backbone',
    'blockui',
    'text!../../../tmpl/home/{template-name}.html'
], function ($, _, Backbone, blockui, template) {
    return Backbone.View.extend({
        el: $('#page-content'),
        render: function () {
        }
    });
});