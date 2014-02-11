define([
    'jquery',
    'underscore',
    'backbone',
    'models/model.profile',
    'views/profile/_profile.detail.full',
    'text!../../../templates/profile/profile.manage.html'
], function ($, _, Backbone, ProfileModel, ProfileDetailView, ManageProfileTemplate) {
    return Backbone.View.extend({
        initialize: function (container) {
            _.bindAll(this, 'render');

            this.render(container);
        },
        render: function (container) {
            container.html(ManageProfileTemplate);

            var profile = new ProfileModel();

            profile.fetch({
                success: function (profile) {
                    console.log(profile);
                    var profileDetailView = new ProfileDetailView();
                    profileDetailView.render($('#manage-profile-view'));
                }
            });
        }
    });
    function back() {
        window.history.back();
    }
});