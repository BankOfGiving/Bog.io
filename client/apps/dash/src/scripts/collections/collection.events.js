define(['jquery', 'underscore', 'backbone', 'modules/bog.api', 'models/model.event'], function ($, _, Backbone, api, event) {
    return Backbone.Collection.extend({
        model: event,
        urlRoot: api.uri.events,
        url: api.uri.events
    });
});