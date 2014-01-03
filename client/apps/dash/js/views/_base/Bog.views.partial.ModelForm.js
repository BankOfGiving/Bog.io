/**
 * Created by dbaxter on 12/6/13.
 */
define([ 'jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    Bog.dash.views.partial = {
        ModelForm: Backbone.View.extend({
            initialize: function () {
                console.log("ModelForm init");
            }
        })
    };
    return Bog.dash.views.partial.ModelForm;
});