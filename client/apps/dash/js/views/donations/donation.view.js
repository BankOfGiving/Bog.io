define([
    'jquery',
    'underscore',
    'backbone',
    'views/donations/_donation.display',
    'views/maps/map.small',
    'models/model.donation',
    'text!../../../tmpl/donations/donation.view.html'
], function($, _, Backbone, DisplayView, MapView, DonationModel, ViewTemplate){
    return Backbone.View.extend({
        el: $('#site-content'),
        render: function(id) {
            var self = this;

            console.log(id);

            var donation = new DonationModel({id: id});

            donation.fetch({
                success: function (donation) {
                    $(self.el).html(_.template(ViewTemplate, {donation: donation, _:_}));
                }
            });
        }
    });
});