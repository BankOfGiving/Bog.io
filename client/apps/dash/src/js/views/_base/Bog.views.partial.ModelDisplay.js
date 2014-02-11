define([ 'jquery', '../../../../../../.', 'backbone'], function ($, _, Backbone) {
    Bog.dash.views.partial = {
        ModelDisplay: Backbone.View.extend({
            initialize: function () {
                console.log("ModelDisplay init");
            }
        })
    };
    return Bog.dash.views.partial.ModelDisplay;
});