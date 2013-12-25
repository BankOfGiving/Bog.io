define([
    'jquery',
    'underscore',
    'backbone',
    'models/model.profile',
    'text!../../../tmpl/profile/profile.edit.html'
], function ($, _, Backbone, ProfileModel, EditProfileTemplate) {
    return Backbone.View.extend({
        el: $('body'),
        model: null,
        initialize: function (container) {
            var self = this;
            _.bindAll(this, 'render', 'bind', 'save', 'cancel');

            var profile = new ProfileModel();
            profile.fetch({
                success: function (profile) {
                    self.model = profile;
                    self.render(container).bind(profile);
                }
            });
        },
        render: function (container) {
            this.$el = container;
            container.html(EditProfileTemplate);
            return this;
        },
        save: function () {
            console.log('save called');
            if (this.isDirty) {
                console.log('save profile!');
            } else {
                console.log('no changes');
            }
            console.log(this.model.attributes.user.displayName);
            this.model.save();
        },
        cancel: function () {
            alert('cancel edits!');
        },
        events: {
            "click button#button-save": "save",
            "click button#button-cancel": "cancel"
        },
        bind: function () {
            var self = this;
            var model = this.model;

            console.log(model);

            var givenNameField = $("input[name='GivenName']");
            var middleNameField = $("input[name='MiddleName']");
            var familyNameField = $("input[name='FamilyName']");
            var displayNameField = $("input[name='DisplayName']");

            givenNameField.val(model.attributes.user.name.given);
            givenNameField.keyup(function () {
                if (givenNameField.val() != model.attributes.user.name.given) {
                    model.attributes.user.name.given = givenNameField.val();
                }
                self.isDirty();
            });

            middleNameField.val(model.attributes.user.name.middle);
            middleNameField.keyup(function () {
                if (middleNameField.val() != model.attributes.user.name.middle) {
                    model.attributes.user.name.middle = middleNameField.val();
                }
                self.isDirty();
            });

            familyNameField.val(model.attributes.user.name.family);
            familyNameField.keyup(function () {
                if (familyNameField.val() != model.attributes.user.name.family) {
                    model.attributes.user.name.family = familyNameField.val();
                }
                self.isDirty();
            });

            displayNameField.val(model.attributes.user.displayName);
            displayNameField.keyup(function () {
                if (displayNameField.val() != model.attributes.user.displayName) {
                    model.attributes.user.displayName = displayNameField.val();
                }
                self.isDirty();
            });
        },
        isDirty: function () {
            console.log(this.model.isDirty);
            return this.model.isDirty;
        }
    });
});