define([
    'jquery',
    'underscore',
    'backbone',
    'models/model.profile',
    'text!../../../tmpl/profile/profile.manage.html',
], function($, _, Backbone, ProfileModel, ManageProfileTemplate){
    return Backbone.View.extend({
        render: function(container) {

            container.html(ManageProfileTemplate);

            $('#Profile-Edit').click(function () {
                console.log('EDIT!!!');
                window.location = '#/profile/edit';
            });
        }
    });
});