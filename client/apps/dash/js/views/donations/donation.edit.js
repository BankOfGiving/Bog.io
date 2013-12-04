define([
    'jquery',
    'underscore',
    'backbone',
    'views/maps/map.small',
    'views/donations/_donation.form',
    'models/model.donation',
    'text!../../../tmpl/donations/donation.edit.html'
], function($, _, Backbone, MapView, FormView, DonationModel, EditTemplate){
    return Backbone.View.extend({
        render: function(container, id) {
            var donation = new DonationModel({id: id});

            donation.fetch({
                success: function (donation) {
                    container.html(_.template(EditTemplate, {donation: donation, _:_}));
                }
            });
        }
    });
});