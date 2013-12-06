define([
    'jquery',
    'underscore',
    'backbone',
    'views/donations/_donation.form',
    'models/model.donation',
    'text!../../../tmpl/donations/donation.add.html'
], function($, _, Backbone, FormView, DonationModel, AddTemplate){
    return Backbone.View.extend({
        el: $('body'),
        initialize: function(container){
            var self = this;

            var donation = new DonationModel();

            donation = donation.attributes;
            self.render(container, donation).bind(donation);
        },
        render: function(container, donation) {

            container.html(AddTemplate);

            DisplayView.initialize($('#Donation-Display'), donation);

            return this;
        },
        bind: function(donation){
            $("div#Donation-View-Container > button.backButton").click(function(){
                history.back();
            });
            $("div#Donation-View-Container > button.addButton").click(function(){
                location.href = '#/Donation/Edit/' + donation.id;
            });
        }
    });
});