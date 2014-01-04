define(['jquery', 'underscore', 'backbone', 'bog.site', 'bog.i18n', 'bog.maps'
    , 'models/model.event'
    , 'text!../../../tmpl/events/event.form.html'
], function ($, _, Backbone, site, i18n, maps, EventModel, FormTemplate) {
    return Backbone.View.extend({
        initialize: function () {
            _.bindAll(this, 'localize', 'cancel', 'save', 'saveEntity', 'saveSuccess', 'saveFailure', 'delete');
            var self = this;
            self.model = new ContactModel();
            if (self.id) {
                self.model = new ContactModel({ id: self.id });
                self.model.fetch({
                    success: function (entity) {
                        self.model = entity;
                        self.render().localize();
                    }});
            } else {
                self.model = new ContactModel();
                self.render().localize();
            }

            return this;
        },
        render: function () {
            var self = this;
            self.$el.empty();

            var eventTypes = self.model.getTypes();

            // figure out better way to handle this.  Should be passing the model not the model.  Binding fails on loadFromEntity
            var compiledTemplate = _.template(FormTemplate, { event: self.model.toJSON(), eventTypes: eventTypes, _: _ });
            self.$el.append(compiledTemplate);

            self.model.bindToForm();
            return this;
        },
        localize: function () {
            var self = this;

            var siteText = i18n.localizeView(this.$el, 'event_edit');

            var siteText = i18n.getViewText('event_edit');

            var sectionText = siteText.form.sections;
            i18n.localizeFormSection('Event-Basics', sectionText.basic);
            i18n.localizeFormSection('Event-Location', sectionText.location);
            i18n.localizeFormSection('Event-Contact', sectionText.contact);

            var formElementText = siteText.form.elements;
            i18n.localizeFormElement('title', formElementText.title);
            i18n.localizeFormElement('description', formElementText.description);
            i18n.localizeFormElement('status', formElementText.status);
            i18n.localizeFormElement('tags', formElementText.tags);
            i18n.localizeFormElement('type', formElementText.type);
            i18n.localizeFormElement('address1', formElementText.address1);
            i18n.localizeFormElement('city', formElementText.city);
            i18n.localizeFormElement('state', formElementText.state);
            i18n.localizeFormElement('postal_code', formElementText.postal_code);
            i18n.localizeFormElement('country', formElementText.country);
            i18n.localizeFormElement('latitude', formElementText.latitude);
            i18n.localizeFormElement('longitude', formElementText.longitude);

            var buttonText = siteText.buttons;
            if (self.entityId) {
                i18n.localizeButton('save', buttonText.save);
            } else {
                i18n.localizeButton('save', buttonText.add);
            }
            i18n.localizeButton('cancel', buttonText.cancel);
            i18n.localizeButton('delete', buttonText.delete);
            return this;
        },
        events: {
            "click #Save-Button": "save",
            "click #Cancel-Button": "cancel",
            "click #Delete-Button": "delete"
        },
        cancel: function () {
            history.back();
        },
        save: function () {
            var self = this;

            if (self.model.get("_is_dirty") == false) {
                alert('nothing to save');
                return;
            }

//            self.model.validate(function(validationMessages){
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
            self.model.save(null, {success: self.saveSuccess, error: self.saveFailure});
            //}
//            });
        },
        saveEntity: function (entity) {
            var self = this;

        },
        delete: function () {
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