/**
 * Created by dbaxter on 12/1/13.
 */
define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    return Backbone.Model.extend({
        urlRoot: 'profile/',
        defaults: {
            isDirty: false
        },
        initialize: function(){
            // Dirty state handling
            this.on('change', this.markDirty);

        },
        markDirty : function(model, options){
            console.log('Mark Dirty!!');
            if(!this.isDirty){
                this.isDirty = true;
            }
        }
    });
});