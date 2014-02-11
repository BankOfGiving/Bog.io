define([
    'jquery',
    'underscore',
    'backbone',
], function ($, _, Backbone) {
    return Backbone.View.extend({
        el: $('body'),
        render: function (id) {
            var self = this;

            console.log(id);

            var donation = new DonationModel({id: id});

            donation.fetch({
                success: function (donation) {
                    $(self.el).html(_.template(DetailTemplate, {donation: donation, _: _}));
                }
            });
        }
    });
});