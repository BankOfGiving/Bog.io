define([ 'jquery', 'underscore', 'backbone', 'text!../../../templates/header/header.dash.html' ],
    function ($, _, Backbone, DashboardHeaderTemplate) {
        return Backbone.View.extend({
            render: function (container) {
                container.html(DashboardHeaderTemplate);
            }
        });
    });