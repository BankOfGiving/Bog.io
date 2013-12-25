define(['jquery', 'underscore', 'backbone', 'bog.site', 'bog.i18n', 'bog.maps'
    , 'collections/collection.events'
    , 'text!../../../tmpl/events/events.list.html'
], function ($, _, Backbone, site, i18n, maps, EventCollection, EventTemplate) {
    return Backbone.View.extend({
        previewMap: null,
        initialize: function () {
            var self = this;

            _.bindAll(this, 'localize', 'goBack', 'goAdd', 'goDetail', 'flyOver');

            var collection = new EventCollection();
            collection.fetch({
                success: function (collection) {
                    self.collection = collection;
                    self.render().localize();
                }});

            return this;
        },
        render: function () {
            var self = this;

            var collection = self.collection.toJSON();

            self.$el.empty();

            _.template.showLocation = function (model) {
                console.log(model);
                if (model.locations_physical) {
                    if (model.locations_physical.length > 0) {
                        var selectedLocation = model.locations_physical[0];
                        var lat = selectedLocation.latitude;
                        var lng = selectedLocation.longitude;
                        console.log(lat + ' | ' + lng);
                        return lat + ' | ' + lng;
                    }
                }
                return '';
            };

            var compiledView;
            if (collection.length == 0) {
                compiledView = _.template(EventTemplate, {collection: null, _: _});
            } else {
                collection = sortByKey(collection, 'title');
                compiledView = _.template(EventTemplate, {collection: collection, _: _});
            }

            self.$el.append(compiledView);

            maps.addMapToCanvas(document.getElementById("PreviewMap"), null, null, null);

            self.previewMap = maps.map;

            maps.createMarkers(self.previewMap, self.collection.toJSON());

            return this;
        },
        events: {
            "click #Back-Button": "goBack",
            "click #Add-Button": "goAdd",
            'click span[data-attribute="title"]': "goDetail",
            'mouseover tr[data-attribute="address"]': "flyOver"
        },
        localize: function () {
            i18n.localizeView(this.$el, 'events_list');
        },
        goBack: function (ctx) {
            console.log('goBack');
            window.location = '/';
        },
        goAdd: function (ctx) {
            console.log('goAdd');
            window.location = '#/event/';
        },
        goDetail: function (ctx) {
            console.log('goDetail');
            var id = ctx.currentTarget.getAttribute('data-id');
            window.location = '#/event/' + id;
        },
        flyOver: function (ctx) {
            var self = this;
            var collection = self.collection.toJSON();

            for (var i = 0; i < self.collection.length; i++) {
                var id = ctx.currentTarget.getAttribute("data-id");
                if (collection[i]._id == id) {
                    var selectedEvent = collection[i];
                    if (selectedEvent.locations_physical) {
                        if (selectedEvent.locations_physical.length > 0) {
                            var selectedLocation = selectedEvent.locations_physical[0];

                            var lat = selectedLocation.latitude;
                            var lng = selectedLocation.longitude;
                            maps.panTo(self.previewMap, lat, lng, 14);
                            return;
                        }
                    }
                }
            }
            maps.panTo(self.previewMap, null, null, null);
        }
    });

    function sortByKey(array, key) {
        return array.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
});