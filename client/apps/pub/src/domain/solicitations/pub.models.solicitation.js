define([ 'jquery', 'underscore', 'backbone', 'modules/bog.api' ],
    function ($, _, Backbone, api) {
        return Backbone.Model.extend({
            urlRoot: api.uri.solicitation
        });
    });