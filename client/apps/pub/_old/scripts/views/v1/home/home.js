define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',

    'modules/bog.api',
    'modules/bog.site',
    'modules/bog.i18n',
    'modules/bog.maps',

    'text!../../../templates/v2/layout.html',
    'text!../../../templates/v2/column-left.html',
    'text!../../../templates/v2/column-middle.html',
    'text!../../../templates/v2/column-right.html'
],
    function ($, _, Backbone, bs, api, site, i18n, maps, layout, columnLeft, columnMiddle, columnRight) {
        return Backbone.View.extend({
            initialize: function () {
                var self = this;
                _.bindAll(self, 'logout');
                console.log(self.$el);
                self.render();
            },
            render: function () {
                var self = this;

                // render home layout
                self.$el.append(layout);

                // pull references to columns
                var leftColumn = $('#home-column-left');
                leftColumn.append(columnLeft);

                var middleColumn = $('#home-column-middle');
                middleColumn.append(columnMiddle);


                var rightColumn = $('#home-column-right');
                rightColumn.append(columnRight);

//            if (maps.markers.length > 0 && map) {
//                maps.clearMarkers();
//            }
//            map = maps.addMapToCanvas(document.getElementById("home-map-canvas"));
//            search.all(function (results) {
//                maps.createMarkers(results, function () {
//                    console.log('successfully search, returned all records, and plotted to map.');
//                });
//            });

                return this;
            },
            localize: function () {
                i18n.localizeView(this.$el, 'pub_home');
            },
            events: {
                "click #Logout": "logout"
            },
            logout: function () {
                $.get(api.uri.auth.logout);
                window.location.href = "/";
            }
        });
    });