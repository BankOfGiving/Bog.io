define([ 'jquery', 'underscore', 'backbone', 'bog', './event_type_model' ],
    function ($, _, Backbone, bog, event_type_model) {
        return Backbone.Collection.extend({
            model: event_type_model,
            url: bog.api.uri.event_types
        });
    });