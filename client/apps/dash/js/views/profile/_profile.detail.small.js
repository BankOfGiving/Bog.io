define([
    'jquery',
    'underscore',
    'backbone',
    'models/model.profile',
    'text!../../../tmpl/profile/_profile.detail.small.html'
], function($, _, Backbone, ProfileModel, ProfileTemplate){
    return Backbone.View.extend({
        render: function(container) {
            var self = this;

            var profile = new ProfileModel();

            profile.fetch({
                success: function (profile) {
                    console.log(profile);
                    console.log(container);
                    console.log(ProfileTemplate);
                    container.append(_.template(ProfileTemplate, {profile: profile, _:_}));
                }
            });
        }
    });
});