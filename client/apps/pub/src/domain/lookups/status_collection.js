define([ 'jquery', 'underscore', 'backbone', 'bog', 'status_model' ],
    function ($, _, Backbone, bog, StatusModel) {
        return Backbone.Collection.extend({
            model: StatusModel,
            url: bog.api.uri.statuses
        });
    });