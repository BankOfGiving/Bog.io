define([ 'jquery', '../../../../../../.', 'backbone'], function ($, _, Backbone) {
    Bog.dash.views.partial = {
        ModelForm: Backbone.View.extend({
            initialize: function () {
                console.log("ModelForm init");
            }
        })
    };
    return Bog.dash.views.partial.ModelForm;
});