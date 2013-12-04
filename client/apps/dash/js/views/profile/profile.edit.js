define([
    'jquery',
    'underscore',
    'backbone',
    'models/model.profile',
    'text!../../../tmpl/profile/_profile.form.html'
], function($, _, Backbone, ProfileModel, ProfileTemplate){
    return Backbone.View.extend({
        render: function(container) {
            var self = this;

            var profile = new ProfileModel();

            profile.fetch({
                success: function (profile) {
                    container.append(_.template(ProfileTemplate, {profile: profile, _:_}));
                }
            });
        }
    });
});