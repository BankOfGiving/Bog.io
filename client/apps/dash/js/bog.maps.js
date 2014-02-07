define(["async!http://maps.google.com/maps/api/js?key=AIzaSyCZjCOZHzKqlOAkBXr1HFrLtY84zVqWZxA&sensor=true!callback"], function (g) {
    return {
        DEFAULT_LATITUDE: 39.833333,
        DEFAULT_LONGITUDE: -98.583333,
        CENTER_LATITUDE: 39.833333,
        CENTER_LONGITUDE: -98.583333,
        DEFAULT_CANVASNAME: "map-canvas",
        DEFAULT_ZOOM: 4,

        map: null,
        markers: [],

        addMapToCanvas: function (mapCanvas, centerLat, centerLng, zoom) {
            var self = this;

            if (!mapCanvas) {
                mapCanvas == self.DEFAULT_CANVASNAME;
            }
            if (!centerLat) {
                centerLat = self.DEFAULT_LATITUDE;
            }
            if (!centerLng) {
                centerLng = self.DEFAULT_LONGITUDE;
            }
            if (!zoom) {
                zoom = self.DEFAULT_ZOOM;
            }

            self.map = new google.maps.Map(mapCanvas, {
                center: new google.maps.LatLng(centerLat, centerLng),
                zoom: zoom,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: false

//                navigationControl: true,
//                navigationControlOptions: {
//                    style: google.maps.NavigationControlStyle.SMALL
//                }
            });
        },

        getCurrentPosition: function (map, callback) {
            var self = this;

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(self._currentPositionSuccess, self._currentPositionError);
                callback(true);
            } else {
                throw new Error('location not available');
            }

            //                function(pos){
            //                    callback({
            //                        lat:  pos.coords.latitude,
            //                        lon: -pos.coords.longitude
            //                    });
            //                },
            //                function(err){
            //                    // default set of coordinates.
            //                    callback({
            //                        lat:  39.833333,
            //                        lon: -98.583333
            //                    });
            //                });
        },

        createMarker: function (map, entity, callback) {
            var self = this;

            if (map) {
                self.map = map;
            }

            for (var i = 0; i < entity.locations_physical.length; i++) {
                var location = entity.locations_physical[i];

                //switch(location[4]){
                //    case "donation":
                var icon = {
                    url: "http://www.communiqsoft.com/images/map/PinDown1.png",
                    size: new google.maps.Size(32, 39),
                    // The origin for this image is 0,0.
                    origin: new google.maps.Point(0, 0),
                    // The anchor for this image is the base of the flagpole at 0,32.
                    anchor: new google.maps.Point(0, 32)
                };

                var contentString = '<div id="content">' +
                    '<div id="siteNotice">Donation</div>' +
                    '<h1 id="firstHeading" class="firstHeading">' + entity.title + '</h1>' +
                    '<div id="bodyContent">Body content</div>' +
                    '</div>';

                //        break;
                //    case "solicitation":
                //        var image = {
                //            url: "http://www.communiqsoft.com/images/map/PinDown1Green.png",
                //            size: new google.maps.Size(32, 39),
                //            // The origin for this image is 0,0.
                //            origin: new google.maps.Point(0,0),
                //            // The anchor for this image is the base of the flagpole at 0,32.
                //            anchor: new google.maps.Point(0, 32)
                //        };
                //
                //        var contentString = '<div id="content">'+
                //            '<div id="siteNotice">Solicitation</div>' +
                //            '<h1 id="firstHeading" class="firstHeading">' + location[0] + '</h1>'+
                //            '<div id="bodyContent">Body content</div>'+
                //            '</div>';
                //        break;
                //}

                var infoWindow = new google.maps.InfoWindow();
                infoWindow.setContent(contentString);
                var markerLatLng = new google.maps.LatLng(location.latitude, location.longitude);

                var marker = new google.maps.Marker({
                    position: markerLatLng,
                    map: self.map,
                    icon: icon,
                    title: entity.title, zIndex: 1000
                });

                google.maps.event.addListener(marker, 'click', function () {
                    infoWindow.open(map, marker);
                });

                this.markers.push(marker);
            }
        },

        createMarkers: function (map, collection, callback) {
            var self = this;
            while (collection.length > 0) {
                var entity = collection.pop();
                self.createMarker(map, entity);
                if (collection.length == 0) {
                    if (callback) {
                        callback();
                    } else {
                        return;
                    }
                    break;
                }
            }
        },

        clearMarkers: function (callback) {
            while (this.markers.length > 0) {
                var marker = this.markers.pop();
                marker.setMap(null);
                if (this.markers.length == 0) {
                    if (callback) {
                        callback();
                    } else {
                        return;
                    }
                    break;
                }
            }
        },

        codeAddress: function (address, callback) {
            var uri = "http://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&sensor=false";
            $.getJSON(uri, function (geocode) {
                callback(geocode);
//                if(geocode.results.length == 0){
//                    callback("no results", geocode);
//                }
//                if(geocode.results.length == 1){
//                    callback(null, geocode);
//                }
//                if(geocode.results.length > 1){
//                    callback('multiple results.', geocode)
//                }
            });
        },

        panTo: function (map, centerLat, centerLng, zoom) {
            var self = this;

            if (!centerLat) {
                centerLat = self.DEFAULT_LATITUDE;
            }
            if (!centerLng) {
                centerLng = self.DEFAULT_LONGITUDE;
            }
            if (!zoom) {
                zoom = self.DEFAULT_ZOOM;
            }
            var centerLatLng = new google.maps.LatLng(centerLat, centerLng);

            map.panTo(centerLatLng);
            map.setZoom(zoom);
        }
    };

    // Sets the map on all markers in the array.
    function setAllMap(map, markers) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

});
