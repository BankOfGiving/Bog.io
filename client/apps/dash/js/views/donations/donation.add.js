define([
    'jquery',
    'underscore',
    'backbone',
    'views/maps/map.small',
    'views/donations/_donation.form',
    'models/model.donation',
    'text!../../../tmpl/donations/donation.add.html'
], function($, _, Backbone, MapView, FormView, DonationModel, AddTemplate){
    return Backbone.View.extend({
        el: $('#site-content'),
        render: function(id) {
            var self = this;

            console.log(id);

            var donation = new DonationModel({id: id});

            donation.fetch({
                success: function (donation) {
                    $(self.el).html(_.template(AddTemplate, {donation: donation, _:_}));
                }
            });
        }
    });
});