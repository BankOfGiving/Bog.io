define([
    'jquery',
    '../../../../../../.',
    'backbone',
    'text!../../../tmpl/donations/_donation.display.html'
], function ($, _, Backbone, DetailTemplate) {
    return Backbone.View.extend({
        initialize: function (container, donation) {
            var self = this;
            self.render(container).bind(donation);
        },
        render: function (container) {
            console.log('CONTAINER:  ' + container.html());

            container.html(DetailTemplate);
            return this;
        },
        bind: function (donation) {
            console.log('DONATION:  ' + donation.title);
            $('#Donation-Display-Title').text(donation.title);
            $('#Donation-Display-Description').text(donation.description);
        }
    });
});