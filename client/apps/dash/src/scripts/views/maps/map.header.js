define([
    'jquery',
    'underscore',
    'backbone',
    'modules/bog.maps',
    'views/home/titlebar',
    'text!../../../templates/maps/map.header.html'
], function ($, _, Backbone, maps, TitleBarView, template) {
    return Backbone.View.extend({
        el: $('#site-header'),
        render: function () {

            this.$el.html(template);

            var mapContainer = document.getElementById("header-map");
            console.log(mapContainer);
            var map = maps.addMapToCanvas(mapContainer);
        }
    });
});