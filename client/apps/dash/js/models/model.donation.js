/**
 * Created by dbaxter on 12/1/13.
 */
define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    return Backbone.Model.extend({
        urlRoot: 'donations/',
        defaults: {
            subtotal: 0,
            discount: 0,
            total: 0
        },
        initialize: function () {
            _.bindAll(this, "update");
            this.on('change:discount', this.update);
            // or, for all attributes
            // this.on('change', this.update);
        },

        update: function () {
            console.log("update : "+this.get("discount"))
        }
    });
});