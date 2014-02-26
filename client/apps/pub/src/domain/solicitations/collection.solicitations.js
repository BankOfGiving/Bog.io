define([ 'jquery', 'underscore', 'backbone', 'bog', 'solicitation_model' ],
    function ($, _, Backbone, bog, solicitation) {
        return Backbone.Collection.extend({
            model: solicitation,
            url: bog.api.uri.solicitations
        });
    });