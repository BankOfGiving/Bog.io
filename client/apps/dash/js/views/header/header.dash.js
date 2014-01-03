/**
 * Created by dbaxter on 12/3/13.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!../../../tmpl/header/header.admin.html'
], function ($, _, Backbone, DashboardHeaderTemplate) {
    return Backbone.View.extend({
        render: function (container) {
            container.html(DashboardHeaderTemplate);
        }
    });
});