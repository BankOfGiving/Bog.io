define([
    'jquery',
    '../../../../../../.',
    'backbone',
    'bog.maps',
    'views/maps/map.header',
    'views/filters/filter.donations',
    'collections/collection.donations',
    'text!../../../tmpl/donations/list.all.html'
], function ($, _, Backbone, maps, MapView, FilterView, DonationsCollection, listAllTemplate) {
    return Backbone.View.extend({
        el: $('#site-content'),
        render: function () {
            var self = this;

            // Load initial data set
            var donations = new DonationsCollection();
            $(self.el).html(_.template(listAllTemplate, {donations: "loading", _: _}));
            donations.fetch({
                success: function (donations) {
                    $(self.el).html(_.template(listAllTemplate, {donations: donations.models, _: _}));

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