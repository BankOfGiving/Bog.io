define([
    'jquery',
    'underscore',
    'backbone',
    'modules/bog.maps',
    'views/maps/map.header',
    'views/filters/filter.solicitations',
    'collections/collection.solicitations',
    'text!../../../templates/solicitations/list.all.html'
], function ($, _, Backbone, maps, MapView, FilterView, SolicitationsCollection, listAllTemplate) {
    return Backbone.View.extend({
        el: $('#site-content'),
        render: function () {
            var self = this;

            // Load initial data set
            var solicitations = new SolicitationsCollection();
            $(self.el).html(_.template(listAllTemplate, {solicitations: "loading", _: _}));
            solicitations.fetch({
                success: function (solicitations) {
                    $(self.el).html(_.template(listAllTemplate, {solicitations: solicitations.models, _: _}));

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