define([
    'jquery',
    'underscore',
    'backbone',
    'views/donations/_donation.display',
    'views/maps/map.small',
    'models/model.donation',
    'text!../../../tmpl/donations/donation.delete.html'
], function($, _, Backbone, MapView, DonationModel, DeleteTemplate){
    return Backbone.View.extend({
        el: $('body'),
        render: function(id) {
            var self = this;

            console.log(id);

            var donation = new DonationModel({id: id});

            donation.fetch({
                success: function (donation) {
                    $(self.el).html(_.template(DeleteTemplate, {donation: donation, _:_}));
                }
            });
        }
    });
});