define([ 'jquery', 'underscore', 'backbone', 'blockui', 'text!../../../templates/home/{template-name}.html' ],
    function ($, _, Backbone, blockui, template) {
        return Backbone.View.extend({
            el: $('#page-content'),
            render: function () {
            }
        });
    });