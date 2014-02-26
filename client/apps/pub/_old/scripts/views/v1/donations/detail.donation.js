define([ 'jquery', 'underscore', 'backbone', 'views/maps/map.small', 'models/model.donation', 'text!../../../templates/donations/detail.html' ],
    function ($, _, Backbone, MapView, DonationModel, DetailTemplate) {
        return Backbone.View.extend({
            el: $('#site-content'),
            render: function (id) {
                var self = this;

                console.log(id);

                var donation = new DonationModel({id: id});

                donation.fetch({
                    success: function (donation) {
                        $(self.el).html(_.template(DetailTemplate, {donation: donation, _: _}));
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