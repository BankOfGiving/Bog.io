define([
    'jquery',
    'underscore',
    'backbone',
    'blockui',
    'views/home/welcome.overlay',
    'text!../../../tmpl/home/main.v1.html',
    'bog.maps',
    'bog.search',
    'bog.site'
], function ($, _, Backbone, blockui, WelcomeOverlay, mainTemplate, maps, search, site) {
    return Backbone.View.extend({
        el: $('#site-container-override'),
        render: function () {
            this.$el.html(mainTemplate);
            site.transitionToSiteOverrideContainer();

            if (maps.markers.length > 0 && map) {
                maps.clearMarkers();
            }
            map = maps.addMapToCanvas(document.getElementById("map-canvas"));
            search.all(function (results) {
                maps.createMarkers(results, function () {
                    console.log('successfully search, returned all records, and plotted to map.');
                });
            });

            var welcomeOverlay = new WelcomeOverlay();
            welcomeOverlay.render();
        },
        initialize: function () {
            console.log('initialize');
        }
    });
});