define([
    'jquery',
    '../../../../../../.',
    'backbone',
    'views/maps/map.small',
    'models/model.solicitation',
    'text!../../../tmpl/solicitations/detail.html'
], function ($, _, Backbone, MapView, SolicitationModel, DetailTemplate) {
    return Backbone.View.extend({
        el: $('#site-content'),
        render: function (id) {
            var self = this;

            console.log(id);

            var solicitation = new SolicitationModel({id: id});

            solicitation.fetch({
                success: function (solicitation) {
                    $(self.el).html(_.template(DetailTemplate, {solicitation: solicitation, _: _}));
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