define([
    'jquery',
    'underscore',
    'backbone',
    'views/maps/map.small',
    'models/model.event',
    'text!../../../tmpl/events/detail.html'
], function($, _, Backbone, MapView, EventModel, DetailTemplate){
    return Backbone.View.extend({
        el: $('#site-content'),
        render: function(id) {
            var self = this;

            console.log(id);

            var event = new EventModel({id: id});

            event.fetch({
                success: function (event) {
                    $(self.el).html(_.template(DetailTemplate, {Event: event, _:_}));
                }
            });

            // Load Pretty Map for the Header
//            var mapView = new MapView();
//            mapView.render();
//
//            // Load search filter
//            var filterContainer = $('#search-filter');
//            var filterView = new FilterView(filterContainer);
//            filterView.render(filterContainer);
        }
    });
});