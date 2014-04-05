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
            _.bindAll(self, "load_dynamic_map", "load_static_map");
            self.base_initialize(el, o, function () {
                self.render(function () {
                    if (callback) {
                        callback();
                    }
                });
            });
        },
        render: function (callback) {
            var self = this;
            self.base_render(module_layout, window.culture, function (module) {
                var map_container = module.find('#map-container').get(0);
                var options = self.manifest.options;
                var map_height = '175px';
                if (options.height) {
                    map_height = options.height;
                }
                if (options.type === 'static') {
                    var map_width = '175px';
                    if (options.width) {
                        map_width = options.width;
                    }
                    self.load_static_map(map_container, map_height, map_width);
                    if (callback) {
                        callback(self);
                    }
                } else {
                    map_container.setAttribute('style', 'height: ' + map_height + ';');
                    self.load_dynamic_map(map_container);
                    if (callback) {
                        callback(self);
                    }
                }
                self.data_channel.subscribe(self.manifest.pubsub.data_topic, function (data) {
                    if (options.type === 'static') {
                        self.load_static_map(map_container, map_height, map_width, data);
                    } else {
                        self.load_dynamic_map(map_container, map_height, map_width, data);
                    }
                });
            });
        },
        load_dynamic_map: function (container, height, width, data) {
            var self = this;
            self.map = new google.maps.Map(container, {
                center: new google.maps.LatLng(self.DEFAULT_LATITUDE, self.DEFAULT_LONGITUDE),
                zoom: 5,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true
            });
        },
        load_static_map: function (container, height, width, data) {
            var static_map;
            if (!data) {
                static_map = $('<img>')
                    .attr('src', 'http://maps.googleapis.com/maps/api/staticmap?center=' + this.DEFAULT_LATITUDE + ',' + this.DEFAULT_LONGITUDE + '&zoom=6&size=' + width.replace('px', '') + 'x' + height.replace('px', '') + '&sensor=false')
                    .attr('style', 'margin: 0px; padding: 0px;');
                $(container).empty().append(static_map);
                return;
            }
            if (data instanceof Array) {
                var marker_list = [];
                for (var i = 0; i < data.length; i++) {
                    marker_list.push(data[i].latitude + ',' + data[i].longitude);
                }
                static_map = $('<img>')
                    .attr('src', 'http://maps.googleapis.com/maps/api/staticmap' +
                        '?size=' + width.replace('px', '') + 'x' + height.replace('px', '') +
                        '&markers=size:mid%7Ccolor:red%7C' + marker_list.join('%7C') +
                        '&sensor=false')
                    .attr('style', 'margin: 0px; padding: 0px;');
                $(container).empty().append(static_map);
                return;
            }
            if (data instanceof Object) {
                static_map = $('<img>')
                    .attr('src', 'http://maps.googleapis.com/maps/api/staticmap' +
                        '?size=' + width.replace('px', '') + 'x' + height.replace('px', '') +
                        '&markers=size:mid%7Ccolor:red%7C' + data.latitude + ',' + data.longitude +
                        '&zoom=14' +
                        '&sensor=false')
                    .attr('style', 'margin: 0px; padding: 0px;');
                $(container).empty().append(static_map);
            }
        }
    });
});