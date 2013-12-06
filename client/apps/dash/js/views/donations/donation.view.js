define([
    'jquery',
    'underscore',
    'backbone',
    'views/donations/_donation.display',
    'views/donations/_donation.form',
    'models/model.donation',
    'text!../../../tmpl/donations/donation.view.html'
], function($, _, Backbone, DisplayView, FormView, DonationModel, ViewTemplate){
    return Backbone.View.extend({
        el: $('body'),
        container: null,
        model: null,
        modelId: null,
        formTemplate: FormView,
        initialize: function(container, id){
            var self = this;
            self.container = container;
            self.id = id;

            _.bindAll(this, 'render', 'renderView', 'renderForm', 'save');

            var donation = new DonationModel({id: id});
            donation.fetch({
                success: function (donation) {
                    self.model = donation;
                    self.render().renderView();
                }
            });
        },
        render: function(){
            var self = this;

            self.container.html(ViewTemplate);

            $("div#Donation-View-Container > button.cancelButton").css("display", "none").click(function(){
                self.renderView();
            });
            $("div#Donation-View-Container > button.saveButton").css("display", "none").click(function(){
                self.save();
            });
            $("div#Donation-View-Container > button.backButton").css("display", "none").click(function(){
                history.back();
            });
            $("div#Donation-View-Container > button.editButton").css("display", "none").click(function(){
                self.renderForm();
            });
            $("div#Donation-View-Container > button.deleteButton").css("display", "none").click(function(){
                alert('are you sure?????')
            });

            return this;
        },
        renderView: function() {
            var self = this;
            var donation = self.model;

            new DisplayView($('#Donation-Workspace'), donation.attributes);

            $("div#Donation-View-Container > button.cancelButton").css("display", "none");
            $("div#Donation-View-Container > button.saveButton").css("display", "none");

            $("div#Donation-View-Container > button.backButton").css("display", "inline");
            $("div#Donation-View-Container > button.editButton").css("display", "inline");
            $("div#Donation-View-Container > button.deleteButton").css("display", "inline");

            return this;
        },
        renderForm: function() {
            var self = this;
            var donation = self.model;

            new FormView($('#Donation-Workspace'), donation.attributes);

            $("div#Donation-View-Container > button.backButton").css("display", "none");
            $("div#Donation-View-Container > button.editButton").css("display", "none");

            $("div#Donation-View-Container > button.cancelButton").css("display", "inline");
            $("div#Donation-View-Container > button.saveButton").css("display", "inline");
            $("div#Donation-View-Container > button.deleteButton").css("display", "inline");

            return this;
        },
        save: function(){
            var self = this;
            self.model.save();
        }
    });
});