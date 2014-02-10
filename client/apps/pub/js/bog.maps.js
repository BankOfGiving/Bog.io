define(["async!http://maps.google.com/maps/api/js?key=AIzaSyCZjCOZHzKqlOAkBXr1HFrLtY84zVqWZxA&sensor=true!callback"], function (g) {
    return {
        DEFAULT_LATITUDE: 39.833333,
        DEFAULT_LONGITUDE: -98.583333,
        CENTER_LATITUDE: 39.833333,
        CENTER_LONGITUDE: -98.583333,
        DEFAULT_CANVASNAME: "map-canvas",

        map: null,
        markers: [],

        addMapToCanvas: function (mapCanvas) {
            var self = this;
            self.map = new google.maps.Map(mapCanvas, {
                center: new google.maps.LatLng(self.DEFAULT_LATITUDE, self.DEFAULT_LONGITUDE),
                zoom: 5,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true

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

        createMarker: function (entity, callback) {
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
            var address = entity.address;
            var markerLatLng = new google.maps.LatLng(address.geometry.location[1], address.geometry.location[0]);
            //var markerLatLng = new google.maps.LatLng(entity.addresses.geometry.location[0], entity.addresses.geometry.location[1]);

            var marker = new google.maps.Marker({
                position: markerLatLng,
                map: map,
                icon: icon,
                title: entity.title
                //, zIndex: i
            });

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open(map, marker);
            });

            this.markers.push(marker);
        },

        createMarkers: function (collection, callback) {
            var self = this;
            while (collection.length > 0) {
                var entity = collection.pop();
                self.createMarker(entity);
                if (collection.length === 0) {
                    callback();
                    break;
                }
            }
        },

        clearMarkers: function (callback) {
            console.log(this.markers.length);
            while (this.markers.length > 0) {
                var marker = this.markers.pop();
                marker.setMap(null);
                if (this.markers.length === 0) {
                    callback();
                    break;
                }
            }
        },

        codeAddress: function (address, callback) {
            var uri = "http://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&sensor=false";
            $.getJSON(uri, function (geocode) {
                console.log(uri);
                console.log(geocode);
                if (geocode.results.length === 0) {
                    callback("no results", null, null);
                }
                if (geocode.results.length == 1) {
                    console.log('GEOCODE: single result.');
                    var lat = geocode.results[0].geometry.location.lat;
                    var lng = geocode.results[0].geometry.location.lng;
                    callback(null, lat, lng);
                }
                if (geocode.results.length > 1) {
                    callback('multiple results.', null, null);
                }
            });
        },

        panTo: function (lat, lng) {
            var centerLatLng = new google.maps.LatLng(lat, lng);

            this.map.panTo(centerLatLng);
            this.map.setZoom(8);
        }
    };

    // Sets the map on all markers in the array.
    function setAllMap(map, markers) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }
});
