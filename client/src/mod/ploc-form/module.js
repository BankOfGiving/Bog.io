define([ 'postal', 'module_base', 'text!./layout-full.html', 'text!./ploc-full.html' ],
    function (postal, mod_base, layout_full, ploc_layout) {
        return mod_base.extend({
            api_root: "/api/mod/ploc-form",
            initialize: function (el, o, callback) {
                var self = this;
                _.bindAll(this, 'load_view_data');

                self.base_initialize(el, o, function () {
                    var opt = self.manifest.options;

                    if (!opt.hasOwnProperty('parent')) {
                        throw "Invalid parent element.";
                    }
                    if (!opt.parent.hasOwnProperty('type')) {
                        throw "Invalid parent type.";
                    }
                    if (!opt.parent.hasOwnProperty('id')) {
                        throw "Invalid parent id.";
                    }
                    /*switch (self.manifest.options.layout) {
                     case 'quick':
                     break;
                     case 'full':
                     break;
                     case 'wizard':
                     break;
                     default:
                     break
                     }*/
                    //self.load_view_data(function (data) {
                    //self.manifest.options.view_data = data;
                    var event_form = $(layout_full);
                    var form_element = event_form.find("form");

                    form_element.append(ploc_layout);
                    var event_form_layout = html_decode(event_form.html());
                    self.base_render(event_form_layout, window.culture, function (rendered_content) {
                        if (callback) {
                            callback(rendered_content);
                        }
                    });
                    //});
                });
            },
            load_view_data: function (callback) {
//                var self = this;
//                var xhr = $.getJSON(self.api_root + '/event/');
//                xhr.done(function (data) {
//                    callback(data);
//                }).fail(function () {
//                        console.log("error");
//                    });
            },
            events: {
                "click #ploc-no-matches-ok": "show_form",
                "click #ploc-partial-matches-ok": "show_form",
                "click #ploc-multiple-matches-ok": "show_form",
                "click #ploc-button-save": "save",
                "click #ploc-button-cancel": "cancel",
                "click #ploc-button-delete": "remove"
            },
            cancel: function () {
                history.back();
            },
            show_form: function (e) {
                if (e) {
                    e.preventDefault();
                }
                $('#ploc-form-container').show();
                $('#ploc-validation-container').hide();
                $("#ploc-multiple-content").hide();
                $("#ploc-nomatches-content").hide();
                $("#ploc-partialmatch-content").hide();
            },
            show_validation: function (e) {
                if (e) {
                    e.preventDefault();
                }
                $('#ploc-form-container').hide();
                $('#ploc-validation-container').show();
            },
            save: function () {
                // TODO: To be replaced with proper data binding.
                var self = this;
                var opt = self.manifest.options;
                var form_elements = self.$el.find("form :input");
                var model = {};
                for (var i = 0; i < form_elements.length; i++) {
                    var el = form_elements[i];
                    if (el.id) {
                        model[el.id] = el.value;
                    }
                }

                console.log(model);
                self.validate(model, function (err, model) {

                });
            },
            saveSuccess: function (model, response) {
                console.log('MODEL:  ' + model);
                console.log('RESPONSE:  ' + response);
                this.model = model;
                this.render();
                alert('Event saved successfully!!');
                var id = model.get("_id");
                if (id) {
                    window.location.href = "#/event/" + model.get("_id");
                } else {
                    window.location.href = "#/events/";
                }
            },
            saveFailure: function (model, response) {
                console.log('MODEL:  ' + model);
                console.log('RESPONSE:  ' + response);
                alert('Event saved failed!!');
            },
            validate: function (model) {
                this.verify(model);
            },
            validate_show_error: function (field) {
                $(field).parent().parent().addClass("has-error");
            },
            validate_clear_error: function (field) {
                $(field).parent().parent().removeClass("has-error");
            },
            verify: function (model) {
                // Verifies the address against google maps api
                var self = this;

                var addressArray = [];
                addressArray.push(model.street);
                addressArray.push(model.city);
                addressArray.push(model.state);
                addressArray.push(model.postal_code);
                addressArray.push(model.country);

                var addressString = addressArray.join(' ');
                self.codeAddress(addressString, function (geocode) {
                    if (geocode.results.length === 0) {
                        self.verify_zero_matches(model);
                        return;
                    }
                    if (geocode.results.length > 1) {
                        self.verify_multiple_matches(geocode);
                        return;
                    }
                    if (geocode.status != 'OK') {
                        self.va();
                        alert('invalid address' + addressString);
                        console.log("status:  " + geocode.status);
                        return;
                    }
                    if (geocode.results[0].partial_match === true) {
                        self.verify_partial_match(geocode);
                        console.log("partial_match:  " + geocode.results[0].partial_match);
                        return;
                    }
                    if (geocode.results.length == 1) {
                        self.model.set("_is_address_validated", true);
                        //self.clearAddressErrors();
                        // entity.save({address: geocode.results[0]}, {success: self.saveSuccess, error: self.saveFailure});
                        // entityToSave = self.model.saveToEntity(self.model, geocode.results[0], self.saveEntity);
                    }
                });
            },
            verify_multiple_matches: function (g) {
                this.show_validation(null);
                console.log('multiple');
                var match_address_container = $("address:parent");
                var match_address = $("address");
                for (var i = 0; i < g.results.length; i++) {
                    var match = g.results[i];
                    console.log(match.formatted_address);
                    match_address.html(match.formatted_address);
                    match_address_container.append(match_address);
                }
                $("#ploc-multiplematches-content").show();
            },
            verify_partial_match: function (g) {
                console.log('partial');
                this.show_validation(null);
                $("address").html(g.results[0].formatted_address);
                $("#ploc-partialmatch-content").show();
            },
            verify_zero_matches: function (g) {
                console.log('none');
                this.show_validation(null);
                $("address").html(g.street + '<br>' + g.city + ', ' + g.state + ' ' + g.postal_code + '<br>' + g.country);
                $("#ploc-nomatches-content").show();
            },
            codeAddress: function (address, callback) {
                var uri = "//maps.googleapis.com/maps/api/geocode/json?address=" + address + "&sensor=false";
                $.getJSON(uri, function (geocode) {
                    console.log(uri);
                    console.log(geocode);
                    callback(geocode);
//                    if (geocode.results.length === 0) {
//                        callback("no results", null, null);
//                    }
//                    if (geocode.results.length == 1) {
//                        console.log('GEOCODE: single result.');
//                        var lat = geocode.results[0].geometry.location.lat;
//                        var lng = geocode.results[0].geometry.location.lng;
//                        callback(null, lat, lng);
//                    }
//                    if (geocode.results.length > 1) {
//                        callback('multiple results.', null, null);
//                    }
                });
            }
        });
    });