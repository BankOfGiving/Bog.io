define([ 'jquery', 'underscore', 'backbone', 'bog' ],
    function ($, _, Backbone, bog) {
        return Backbone.Model.extend({
            url: bog.api.uri.event_type
        });
    });