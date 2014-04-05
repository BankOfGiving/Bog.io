define([
    'jquery',
    'under',
    'backbone',
    'views/maps/map.small'
], function ($, _, Backbone, MapView, SolicitationModel, DetailTemplate) {
    return Backbone.View.extend({
        el: $('body'),
        render: function (id) {
            var self = this;

            console.log(id);

            var solicitation = new SolicitationModel({id: id});

            solicitation.fetch({
                success: function (solicitation) {
                    $(self.el).html(_.template(DetailTemplate, {solicitation: solicitation, _: _}));
                }
            });
        }
    });
});