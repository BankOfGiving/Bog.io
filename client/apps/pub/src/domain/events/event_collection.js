define([ 'jquery', 'underscore', 'backbone', 'bog', './event_model' ],
    function ($, _, Backbone, bog, EventModel) {
        return Backbone.Collection.extend({
            model: EventModel,
            filter: '',
            url: function () {
                if (this.filter === '') {
                    return bog.api.uri.events;
                } else {
                    return bog.api.uri.events + '?filter=' + JSON.stringify(this.filter);
                }
            }
        });
    });