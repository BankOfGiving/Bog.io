define([
    'jquery',
    'underscore',
    'backbone',
    'models/model.profile',
    'text!../../../tmpl/profile/_profile.detail.small.html'
], function($, _, Backbone, ProfileModel, ProfileTemplate){
    return Backbone.View.extend({
        el: $('body'),
        container: null,
        model: null,
        screenText: {
            labelName: 'Name',
            labelEmail: 'Email'
        },
        initialize: function(container, profile){
            var self = this;

            self.container = container;
            self.model = profile;
            self.render();
        },
        render: function() {
            var self = this;

            var profile = self.model.attributes.user;
            self.container.append(ProfileTemplate);

            var panel = $('div#Profile-Display-SmallPanel');

            panel.children($('label[for="Name"]')).text(self.screenText.labelName);
            panel.children($("input#Name")).val(profile.displayName);

            panel.children($('label[for="Email"]')).text(self.screenText.labelEmail);
            panel.children($("input#Email")).val(profile.emails[0].value);
        }
    });
});