/**
 * Created by dbaxter on 12/1/13.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/profile/profile.detail.small',
    'text!../../../tmpl/home/main.v1.html'
], function($, _, Backbone, ProfileView, mainTemplate){
    return Backbone.View.extend({
        render: function(container) {

            container.html(mainTemplate);

            var profilePanelContainer = $("#profile-panel")
            var profileView = new ProfileView();
            profileView.render(profilePanelContainer);
        },
        initialize: function(){
            console.log('initialize');
        }
    });
});