define([ 'jquery', 'underscore', 'backbone', 'text!../../../templates/donations/_donation.display.html' ],
    function ($, _, Backbone, DetailTemplate) {
        return Backbone.View.extend({
            initialize: function (container, donation) {
                var self = this;
                self.render(container).bind(donation);
            },
            render: function (container) {
                container.html(DetailTemplate);
                return this;
            },
            bind: function (donation) {
                $('#Donation-Display-Title').text(donation.title);
                $('#Donation-Display-Description').text(donation.description);
            }
        });
    });