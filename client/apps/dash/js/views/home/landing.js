/**
 * Created by dbaxter on 12/1/13.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/profile/_profile.detail.small',
    'text!../../../tmpl/home/main.v1.html'
], function($, _, Backbone, ProfileView, mainTemplate){
    return Backbone.View.extend({
        initialize: function(){
            console.log('initialize');
        },
        render: function(container) {

            container.html(mainTemplate);

            var profilePanelContainer = $("#profile-panel");
            var profileView = new ProfileView();
            profileView.render(profilePanelContainer);

            $("#Logout").click(function(){
                $.get("/auth/logout/");
            })
        }
    });
});