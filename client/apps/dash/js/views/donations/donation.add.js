define([
    'jquery',
    'underscore',
    'backbone',
    'models/model.donation',
    'text!../../../tmpl/donations/donation.add.html'
], function($, _, Backbone, DonationModel, AddTemplate){
    return Backbone.View.extend({
        el: $('#Donation-Workspace'),
        model: null,
        action: 'add',
        screenText: {
            page: {
                add: {
                    title: 'Add Donation',
                    description: ''
                },
                edit: {
                    title: 'Edit Donation',
                    description: ''
                }
            },
            buttons: {
                addButton: 'Add',
                backButton: 'Back',
                cancelButton: 'Cancel',
                deleteButton: 'Delete',
                editButton: 'Edit',
                saveButton: 'Save'
            },
            fieldLabels: {
                title: 'Title',
                description: 'Description'
            }
        },
        initialize: function(id){
            var self = this;

            self.model = new DonationModel();

            if(id){
                self.model.fetch({
                    success: function(donation){
                        self.model = donation;
                    }
                })
            }

            self.render().bind();
        },
        render: function() {
            var self = this;
            self.$el.html(AddTemplate);
            var pageText = self.screenText.page;
            var pageTitle = $("#page-title");
            var pageDescription = $("#page-description");
            switch (self.action) {
                case "add":
                    pageTitle.text(pageText.add.title);
                    pageDescription.text(pageText.add.description);
                    break;
                case "edit":
                    pageTitle.text(pageText.add.title);
                    pageDescription.text(pageText.add.description);
                    break;
            }

            var donation = self.model;

            var form = $("form#Donation-Form");
            var formText = self.screenText.fieldLabels;

            form.children('label[for="Title"]').text(formText.title);
            form.children('input[name="Title"]').val(donation.title);

            form.children('label[for="Description"]').text(formText.description);
            form.children('input[name="Description"]').val(donation.description);

            var buttonBar = $("div#Donation-ButtonBar");
            var buttonText = self.screenText.buttons;
            buttonBar.children(".addButton").css("display", "inline").text(buttonText.addButton).click(function(){
                form.submit();
            });
            buttonBar.children(".backButton").css("display", "none").text(buttonText.backButton).click(function(){
                self.back();
            });
            buttonBar.children(".cancelButton").css("display", "inline").text(buttonText.cancelButton).click(function(){
                self.back();
            });
            buttonBar.children(".deleteButton").css("display", "none").text(buttonText.deleteButton).click(function(){
                self.back();
            });
            buttonBar.children(".editButton").css("display", "none").text(buttonText.editButton).click(function(){
                self.back();
            });
            buttonBar.children(".saveButton").css("display", "none").text(buttonText.saveButton).click(function(){
                self.back();
            });

            return this;
        },
        events: {
            "submit form#Donation-Form" : "addDonation"
        },
        back: function(){
            history.back();
        },
        addDonation: function(event){
            event.preventDefault();
            console.log('save');
            var self = this;
            var donation = self.model;
            var form = $('Donation-Form-Container');

            donation.set('title', form.children($('#Title')).val());
            donation.set('description', form.children($('#Description')).val());
            if(donation.validate()){
                alert('SAVE!');
                donation.save();
            }
        }
    });
});