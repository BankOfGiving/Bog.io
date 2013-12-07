/**
 * Created by dbaxter on 12/1/13.
 */
Bog.models.Donation = Backbone.Model.extend({
    urlRoot: 'donations/',
    defaults: {
        donation: {
        title: '',
        description: ''
        }
    },
    initialize: function () {
    },
    save: function () {
    },
    validate: function(attrs) {
        if(attrs.title && attrs.title != ''){
            return "Needs a title!"
        }
    }
});
