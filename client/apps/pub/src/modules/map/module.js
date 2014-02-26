define([
    'jquery',
    'underscore',
    'backbone',
    'bog',

    'text!./mod-map.html'
],
    function ($, _, Backbone, bog, module_layout) {
        return Backbone.View.extend({
            initialize: function (vars) {
                var self = this;
                self.render(vars).localize();
            },
            render: function () {
                var self = this;

                var mapContainer = self.$el.append(module_layout).children('div');
                self.$el.append(mapContainer);
                mapContainer.attr('style', 'height: 100px;');

                bog.maps.addMapToCanvas($(mapContainer)[0]);
                return this;
            },
            localize: function () {
                return this;
            }
        });
    });