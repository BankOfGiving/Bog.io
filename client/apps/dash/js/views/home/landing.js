/**
 * Created by dbaxter on 12/1/13.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'models/model.profile',
    'views/profile/_profile.detail.small',
    'text!../../../tmpl/home/main.v1.html'
], function($, _, Backbone, ProfileModel, ProfileView, mainTemplate){
    return Backbone.View.extend({
        model: null,
        container: null,
        initialize: function(container){
            var self = this;

            self.container = container;

            var profile = new ProfileModel();
            profile.fetch({
                success: function (profile) {
                    self.model = profile;
                    self.render();
                }
            });
        },
        render: function() {
            var self = this;

            self.container.html(mainTemplate);

            var profileView = new ProfileView($("#Profile-Panel"), self.model);

            $("#Logout").click(function(){
                $.get("/auth/logout/");
            })
        }
    });
});