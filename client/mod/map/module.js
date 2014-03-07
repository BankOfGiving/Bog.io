define([ 'module_base', 'text!./mod-map.html', 'async!http://maps.google.com/maps/api/js?sensor=false' ], function (mod_base, module_layout) {
    return mod_base.extend({
        api_root: "/api/mod/map",
        DEFAULT_LATITUDE: 39.833333,
        DEFAULT_LONGITUDE: -98.583333,
        CENTER_LATITUDE: 39.833333,
        CENTER_LONGITUDE: -98.583333,
        map: null,
        markers: [],
        initialize: function (el, o, callback) {
            var self = this;
            _.bindAll(self, "addMapToCanvas");
            self.base_initialize(el, o, function () {
                self.base_render(module_layout, window.culture, function (module) {
                    var map_container = module.find('#map-container').get(0);
                    map_container.setAttribute('style', 'height: 200px;');
                    self.addMapToCanvas(map_container); //.html('This is where the map goes!');
                    if (callback) {
                        callback(self);
                    }
                });
            });
        },
        addMapToCanvas: function (mapCanvas) {
            var self = this;
            self.map = new google.maps.Map(mapCanvas, {
                center: new google.maps.LatLng(self.DEFAULT_LATITUDE, self.DEFAULT_LONGITUDE),
                zoom: 5,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true
            });
        }
    });
});