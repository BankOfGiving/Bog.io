define([ 'bog', 'postal', 'moment', 'module_base', 'text!./layout-full.html', 'modules/ploc-form/module'],
    function (bog, postal, moment, mod_base, layout_full, ploc_module) {
        var mod_util = new bog.modules();
        return mod_base.extend({
            api_root: "/api/mod/event-display",
            initialize: function (el, o, callback) {
                var self = this;
                _.bindAll(this, 'load_view_data');
                self.data_channel.subscribe(self.manifest.pubsub.data_topic, function (data) {
                    self.search_results(self.results, data);
                });
                self.base_initialize(el, o, function () {
                    if (!self.manifest.options || self.manifest.options.event) {
                        var opt = self.manifest.options;
                        if (opt.event.hasOwnProperty('model') && opt.event.model) {
                            console.log('MODEL PROVIDED');
                        } else {
                            if (opt.event.hasOwnProperty('id') && opt.event.id) {
                                self.load_view_data(opt.event.id, function (data) {
                                    opt.event.model = data;
                                    self.render(function () {
                                        if (callback) {
                                            callback();
                                        }
                                    });
                                });
                            } else {
                                console.log('NO MODEL OR ID PROVIDED | THROW ERROR');
                                throw "No event provided.";
                            }
                        }
                    } else {
                        self.render(function () {
                            if (callback) {
                                callback();
                            }
                        });
                    }
                });
            },
            render: function (callback) {
                var self = this;
                self.base_render(layout_full, window.culture, function () {
                    // push locations to map
//                    self.data_channel.publish(self.manifest.pubsub.data_topic, self.manifest.options.event.model.locations_physical);
//                    if (callback) {
//                        callback();
//                    }
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
                "click #event-location-delete": "location_delete",
                "click #event-contact-add": "contact_add",
                "click #event-contact-edit": "contact_edit",
                "click #event-contact-delete": "contact_delete",
                "click #event-virtual-add": "virtual_add",
                "click #event-virtual-edit": "virtual_edit",
                "click #event-virtual-delete": "virtual_delete",
                "click #event-delete": "event_delete",
                "click #event-cancel": "cancel"
            },
            refresh_data: function () {
                var self = this;
                self.load_view_data(self.manifest.options.event.id, function (data) {
                    self.manifest.options.event.model = data;
                    self.render();
                });
            },
            details_edit: function () {
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
            },
            contact_add: function () {
                alert('add contact');
            },
            contact_edit: function () {
            },
            contact_delete: function () {
            },
            virtual_add: function () {
                alert('add virtual');
            },
            virtual_edit: function () {
            },
            virtual_delete: function () {
            },
            event_delete: function () {
                alert('delete event');
            },
            cancel: function () {
                history.back();
            }
        });

        function showValidationErrors(validationMessages) {
            for (var v = 0; v < validationMessages.length; v++) {
                var field = $('[data-bind-event="' + validationMessages[v][0] + '"]');
                field.parent().parent().addClass("has-error");
            }
        }

        function showAddressErrors() {
            var fields = $('[data-bind-event^="location"]');
            for (var v = 0; v < fields.length; v++) {
                var field = fields[v];
                $(field).parent().parent().addClass("has-error");
            }
        }

        function clearAddressErrors() {
            var fields = $('[data-bind-event^="location"]');
            for (var v = 0; v < fields.length; v++) {
                var field = fields[v];
                $(field).parent().parent().removeClass("has-error");
            }
        }
    });

function html_decode(str) {
    return String(str)
        .replace(/&amp;/, '&')
        .replace(/&quot;/g, '\"')
        .replace(/&#39;/g, '\'')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
}