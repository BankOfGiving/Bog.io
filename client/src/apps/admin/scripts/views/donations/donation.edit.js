define(['jquery', '../../../../../../../', 'backbone', 'views/maps/map.small', 'views/donations/_donation.form', 'models/model.donation', 'text!../../../templates/donations/donation.edit.html'],
    function ($, _, Backbone, MapView, FormView, DonationModel, EditTemplate) {
        return Backbone.View.extend({
            el: $('body'),
            initialize: function (container, id) {
                var self = this;

                var donation = new DonationModel({id: id});

                donation.fetch({
                    success: function (donation) {
                        donation = donation.attributes;
                        self.render(container, donation).bind(donation);
                    }
                });

            },
            render: function (container, donation) {
                container.html(EditTemplate);

                var displayView = new DisplayView($('#Donation-Display'), donation);
                return this;
            },
            bind: function (donation) {
                $("div#Donation-View-Container > button.backButton").click(function () {
                    history.back();
                });
                $("div#Donation-View-Container > button.addButton").click(function () {
                    location.href = '#/Donation/Edit/' + donation.id;
                });
            }
        });
    });