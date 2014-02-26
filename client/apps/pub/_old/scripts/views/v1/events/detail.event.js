define([ 'jquery', 'underscore', 'backbone', 'views/maps/map.small', 'models/model.event', 'text!../../../templates/events/detail.html' ],
    function ($, _, Backbone, MapView, EventModel, DetailTemplate) {
        return Backbone.View.extend({
            el: $('#site-content'),
            render: function (id) {
                var self = this;

                console.log(id);

                var event = new ContactModel({id: id});

                event.fetch({
                    success: function (event) {
                        $(self.el).html(_.template(DetailTemplate, {Event: event, _: _}));
                    }
                });
            }
        });
    });