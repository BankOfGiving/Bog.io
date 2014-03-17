define([ 'bog', 'postal', 'moment', 'module_base', 'text!./layout-full.html', 'modules/ploc-form/module'],
    function (bog, postal, moment, mod_base, layout_full, ploc_module) {
        var mod_util = new bog.modules();
        return mod_base.extend({
            api_root: "/api/mod/event-display",
            initialize: function (el, o, callback) {
                var self = this;
                _.bindAll(this, 'load_view_data');
                self.base_initialize(el, o, function () {
                    var opt = self.manifest.options;
                    if (opt.hasOwnProperty('locations') && opt.locations) {
                        console.log('LOCATIONS PROVIDED');
                    } else {
                        console.log('NO MODEL OR ID PROVIDED | THROW ERROR');
                        throw "No event provided."
                    }
                });
            },
            render: function (callback) {
                var self = this;
                self.base_render(layout_full, window.culture, function () {
                    // push locations to map
                    self.data_channel.publish(self.manifest.pubsub.data_topic, self.manifest.options.event.model.locations_physical);
                    if (callback) {
                        callback();
                    }
                });


                return self;
            },
            load_view_data: function (id, callback) {
                var self = this;
                var xhr = $.getJSON(self.api_root + '/event/' + id);
                xhr.done(function (data) {
                    callback(data);
                }).fail(function () {
                        console.log("error");
                    });
            },
            events: {
                "hidden.bs.modal #event-modal": "refresh_data",
                "mouseover address:parent:parent": "location_map_one",
                "mouseout address": "location_map_all",
                "click #event-details-edit": "details_edit",
                "click #event-location-show": "location_modal_show",
                "click #event-location-add": "location_add",
                "click #event-location-edit": "location_edit",
                "click #event-location-delete": "location_delete"
            },
            location_byid: function (id) {
                var self = this;
                var locs = self.manifest.options.event.model.locations_physical;
                for (var i = 0; i < locs.length; i++) {
                    if (locs[i]._id === id) {
                        return locs[i];
                    }
                }
            },
            location_map_one: function (e) {
                var self = this;
                var loc_id = e.currentTarget.getAttribute('data-source');
                var loc = self.location_byid(loc_id);
                self.data_channel.publish(self.manifest.pubsub.data_topic, loc);
            },
            location_map_all: function () {
                var self = this;
                self.data_channel.publish(self.manifest.pubsub.data_topic, self.manifest.options.event.model.locations_physical);
            },
            location_modal_show: function () {
                var self = this;
                var opt = self.manifest.options;
                var manifest = new mod_util.manifest();
                manifest.mod_type = 'ploc-form';
                manifest.uid = 'event';
                manifest.options = {
                    layout: 'modal',
                    parent: {
                        type: 'event',
                        id: opt.event.id
                    }
                };
                new ploc_module($("#event-modal-content"), manifest, function () {
                    $("#event-modal").modal('show');
                });
            },
            location_add: function () {
            },
            location_edit: function (e) {
                alert(e.currentTarget.getAttribute('data-source'));
            },
            location_delete: function (e) {
                alert(e.currentTarget.getAttribute('data-source'));
            }
        });
    });