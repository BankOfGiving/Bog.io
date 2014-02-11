define([
    'jquery',
    '../../../../../../.',
    'backbone',
    'text!../../../tmpl/header/header.dash.html'
], function ($, _, Backbone, DashboardHeaderTemplate) {
    return Backbone.View.extend({
        render: function (container) {
            container.html(DashboardHeaderTemplate);
        }
    });
});