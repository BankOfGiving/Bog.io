define([
    'jquery',
    'underscore',
    'backbone',
    'text!../../../tmpl/donations/_donation.form.html'
], function($, _, Backbone, FormTemplate){
    return Backbone.View.extend({
        initialize: function(container, donation){
            var self = this;
            self.render(container).bind(donation);
        },
        render: function(container) {
            console.log('CONTAINER:  ' + container.html());

            container.html(FormTemplate);
            return this;
        },
        bind: function (donation){
            console.log('FORM TITLE:  ' + donation.title);
            console.log('FORM DESCRIPTION:  ' + donation.description);
            var form = $('#Donation-Form');
            form.children('input[name="Title"]').val(donation.title);
            form.children('input[name="Description"]').val(donation.description);
        }
    });
});