/**
 * Created by dbaxter on 12/1/13.
 */
Bog.collections.Donations = Backbone.Collection.extend({
        model: Bog.models.Donation,
        urlRoot: 'donations/',
        url: 'donations/'
});