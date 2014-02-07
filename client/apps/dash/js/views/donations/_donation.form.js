define([
    'jquery',
    'underscore',
    'backbone',
    'text!../../../tmpl/donations/_donation.form.html'
], function ($, _, Backbone, FormTemplate) {
    return Backbone.View.extend({
        el: $('body'),
        container: null,
        model: null,
        screentext: {
            fieldLabels: {
                Title: 'Title',
                Description: 'Description'
            }
        },
        initialize: function (container, donation) {
            var self = this;

            self.container = container;
            self.model = donation;

            self.render();
        },
        render: function () {
            var self = this;

            self.container.html(FormTemplate);
            var donation = self.model.attributes.donation;
            var screenText = self.screentext;

            var form = $('#Donation-Form');

            form.children('label[for="Title"]').text(screenText.fieldLabels.Title);
            form.children('input[name="Title"]').val(donation.title);

            form.children('label[for="Description"]').text(screenText.fieldLabels.Description);
            form.children('input[name="Description"]').val(donation.description);

            return this;
        }
    });
});