define([
    'jquery',
    'underscore',
    'backbone',
    'models/model.profile',
    'text!../../../tmpl/profile/profile.detail.full.html'
], function($, _, Backbone, ProfileModel, ProfileTemplate){
    return Backbone.View.extend({
        render: function(container) {
            var self = this;

            var profile = new ProfileModel();

            profile.fetch({
                success: (function (data) {
                    alert(' Service request success: ' + data);
                    $('#manage-profile-view').html(_.template(ProfileViewTemplate, {profile: data.attributes.user, _:_}));
                }),
                error:(function (e) {
                    alert(' Service request failure: ' + e);
                }),
                complete:(function (e, data) {
                    alert(' Service request completed ');
                    console.log('COMPLETE:  ' + data);
                })
//                success: function (profile) {
//                    $('#manage-profile-view').html(_.template(ProfileViewTemplate, {profile: profile, _:_}));
//                }
            });



            profile.fetch({
                success: function (data) {
                    container.append(_.template(ProfileTemplate, {profile: data.attributes.user, _:_}));
                }
            });
        }
    });
});