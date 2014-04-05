define([
    'jquery',
    'under',
    'backbone',
    'views/_base/Bog.views.partial.ListModels',
    'text!../../../templates/donations/_donations.list.items.html'
], function ($, _, Backbone, _base, Template) {
    return _base.extend({
        template: Template
    });
});