define(['jquery', 'under', 'backbone', 'models/model.event'], function ($, _, Backbone, event) {
    return Backbone.Collection.extend({
        model: event,
        urlRoot: 'events/',
        url: 'events/'
    });
});