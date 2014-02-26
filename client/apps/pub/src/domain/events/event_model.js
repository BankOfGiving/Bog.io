define([ 'jquery', 'underscore', 'backbone', 'bog' ],
    function ($, _, Backbone, bog) {
        return Backbone.Model.extend({
            url: bog.api.uri.event,
            defaults: {
                title: "",
                type: null,
                status: "private"
            }
        });
    });