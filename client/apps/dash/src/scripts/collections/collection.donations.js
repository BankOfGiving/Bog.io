define(['jquery', 'underscore', 'backbone', 'modules/bog.api', 'models/model.donation'], function ($, _, Backbone, api, donation) {
    return Backbone.Collection.extend({
        model: donation,
        urlRoot: api.uri.donations,
        url: api.uri.donations
    });
});