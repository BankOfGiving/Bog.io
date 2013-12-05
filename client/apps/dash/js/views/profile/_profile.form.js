define([
    'jquery',
    'underscore',
    'backbone',
    'text!../../../tmpl/profile/_profile.form.html'
], function($, _, Backbone, FormTemplate){
    return Backbone.View.extend({
        model: null,
        initialize: function(container, profile) {
            this.model = profile;
            this.render(container).bind(profile);
        },
        render: function(container) {
            container.html(FormTemplate);
            return this;
        },
        bind: function (model){
            var nameField = $("input[name='Name']");
            var emailField = $("input[name='Email']");

            nameField.val(model.name);
            nameField.keyup(function (){
                if(!model.isDirty)
                    model.isDirty = (nameField.val() != model.name);
            });
            emailField.val(model.email);
            emailField.keyup(function (){
            if(!model.isDirty)
                model.isDirty = (emailField.val() != model.name);
            });
        }
    });
});