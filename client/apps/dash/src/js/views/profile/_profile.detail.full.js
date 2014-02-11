define([
    'jquery',
    '../../../../../../.',
    'backbone',
    'models/model.profile',
    'text!../../../tmpl/profile/_profile.detail.full.html'
], function ($, _, Backbone, ProfileModel, ProfileTemplate) {
    return Backbone.View.extend({
        render: function (container) {
            var profile = new ProfileModel();

            profile.fetch({
                success: (function (data) {
                    $('#manage-profile-view').html(_.template(ProfileTemplate, {profile: data.attributes.user, _: _}));
                }),
                error: (function (e) {
                    console.log(e);
                }),
                complete: (function (e, data) {
                })
            });
        }
    });
});