define([
    'jquery',
    'underscore',
    'backbone',
    'views/maps/map.small',
    'models/model.donation',
    'text!../../../templates/donations/donation.form.html'
], function ($, _, Backbone, MapView, DonationModel, DetailTemplate) {
    return Backbone.View.extend({
        el: $('body'),
        render: function (id) {
            var self = this;

            var donation = new DonationModel({id: id});

            donation.fetch({
                success: function (donation) {
                    $(self.el).html(_.template(DetailTemplate, {donation: donation, _: _}));
                }
            });
        }
    });
});