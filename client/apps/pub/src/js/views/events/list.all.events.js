define([
    'jquery',
    'underscore',
    'backbone',
    'bog.maps',
    'views/maps/map.header',
    'views/filters/filter.events',
    'collections/collection.events',
    'text!../../../tmpl/events/list.all.html'
], function ($, _, Backbone, maps, MapView, FilterView, EventsCollection, listAllTemplate) {
    return Backbone.View.extend({
        el: $('#site-content'),
        render: function () {
            var self = this;

            // Load initial data set
            var events = new EventsCollection();
            $(self.el).html(_.template(listAllTemplate, {events: "loading", _: _}));
            events.fetch({
                success: function (events) {
                    $(self.el).html(_.template(listAllTemplate, {events: events.models, _: _}));

                    // Load search filter
                    var filterContainer = $('#search-filter');
                    var filterView = new FilterView(filterContainer);
                    filterView.render(filterContainer);
                }
            });

            // Load Pretty Map for the Header
            var mapContainer = document.getElementById("site-header");
            var mapView = new MapView();
            mapView.render();

            // Load search filter
            var filterContainer = $('#search-filter');
            var filterView = new FilterView(filterContainer);
            filterView.render(filterContainer);

        }
    });
});