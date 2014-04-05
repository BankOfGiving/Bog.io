define([ 'postal', 'module_base', 'text!./layout-full.html', 'text!./event-basics.html' ],
    function (postal, mod_base, layout_full, form_basics) {
        return mod_base.extend({
            api_root: "/api/mod/event-form",
            initialize: function (el, o, callback) {
                var self = this;
                _.bindAll(this, 'load_view_data');
                self.base_initialize(el, o, function () {
                    self.load_view_data(function (data) {
                        self.manifest.options.view_data = data;
                        var event_form = $(layout_full);
                        var form_element = event_form.find("form");
                        form_element.append(form_basics);
                        var event_form_layout = event_form.html();
                        self.base_render(html_decode(event_form_layout), window.culture, function (self) {
                            if (callback) {
                                callback(self);
                            }
                        });
                    });
                });
            },
            load_view_data: function (callback) {
                var self = this;
                var xhr = $.getJSON(self.api_root + '/event/');
                xhr.done(function (data) {
                    callback(data);
                }).fail(function () {
                        console.log("error");
                    });
            },
            events: {
                "click #Save-Button": "save",
                "click #Cancel-Button": "cancel",
                "click #Delete-Button": "remove"
            },
            cancel: function () {
                history.back();
            },
            save: function () {

                // TODO: To be replaces with proper data binding.
                var self = this;
                var form_elements = self.$el.find("form :input");
                for (var i = 0; i < form_elements.length; i++) {
                    var el = form_elements[i];
                    if (el.id) {
                        self.manifest.options.view_data.event_model[el.id] = el.value;
                    }
                }
                console.log(self.manifest.options.view_data.event_model);
                $.ajax({
                    type: "POST",
                    //contentType: "application/json; charset=utf-8",
                    url: self.api_root + '/event/',
                    //dataType: "json",
                    data: self.manifest.options.view_data.event_model
                })
                    .done(function (msg) {
                        console.log(self.manifest.options.view_data.event_model);
                        alert("Data Saved: " + msg);
                    }).fail(function (msg) {
                        alert("Save failed: " + msg);
                    });
//                if (self.model.get("_is_dirty") === false) {
//                    alert('nothing to save');
//                  return;
//                }
//              self.model.validate(function(validationMessages){
//                if(validationMessages.length){
//                    showValidationErrors(validationMessages);
//                    return;
//                }
//                var entityToSave;
//                if(self.model.get("_is_address_validated") != true){
//                    var addressArray = [];
//                    addressArray.push(self.model.get("address1"));
//                    addressArray.push(self.model.get("city"));
//                    addressArray.push(self.model.get("state"));
//                    addressArray.push(self.model.get("postal_code"));
//                    addressArray.push(self.model.get("country"));
//
//                    var addressString = addressArray.join(' ');
//                    maps.codeAddress(addressString, function(geocode){
//                        if(geocode.results.length == 0){
//                            showAddressErrors();
//                            alert('invalid address' + addressString);
//                            console.log('no results');
//                            return;
//                        }
//                        if(geocode.results.length > 1){
//                            alert('Multiple results found.  Show selector.');
//                            return;
//                        }
//                        if(geocode.status != 'OK'){
//                            showAddressErrors();
//                            alert('invalid address' + addressString);
//                            console.log("status:  " + geocode.status);
//                            return;
//                        }
//                        if(geocode.results[0].partial_match == true){
//                            showAddressErrors();
//                            alert('invalid address' + addressString);
//                            console.log("partial_match:  " + geocode.results[0].partial_match);
//                            return;
//                        }
//                        if(geocode.results.length == 1){
//                            self.model.set("_is_address_validated", true);
//                            clearAddressErrors();
//                            entity.save({address: geocode.results[0]}, {success: self.saveSuccess, error: self.saveFailure});
//                            // entityToSave = self.model.saveToEntity(self.model, geocode.results[0], self.saveEntity);
//                        }
//                    });
//                } else {
//                self.model.save(null, {success: self.saveSuccess, error: self.saveFailure});
//              }
//            });
            },
            saveEntity: function (entity) {
                var self = this;

            },
            remove: function () {
                window.location.href = "#/event/delete/" + this.entityId;
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