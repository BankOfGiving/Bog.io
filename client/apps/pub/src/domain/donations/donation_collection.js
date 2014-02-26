define([ 'jquery', 'underscore', 'backbone', 'bog', 'donation_model' ],
    function ($, _, Backbone, bog, donation) {
        return Backbone.Collection.extend({
            model: donation,
            urlRoot: bog.api.uri.donations,
            url: bog.api.uri.donations
        });
    });