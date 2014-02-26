define([ 'jquery', 'underscore', 'backbone', 'bog' ],
    function ($, _, Backbone, bog) {
        return Backbone.Model.extend({
            urlRoot: bog.api.uri.statuses
        });
    });