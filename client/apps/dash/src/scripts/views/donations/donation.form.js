define(['jquery', 'underscore', 'backbone', 'modules/bog.site', 'modules/bog.i18n', 'modules/bog.maps', 'models/model.donation', 'text!../../../templates/donations/donation.form.html'],
    function ($, _, Backbone, site, i18n, maps, DonationModel, FormTemplate) {
        return Backbone.View.extend({
            siteText: null,
            entityId: null,
            parsed_address: null,
            viewModel: null,
            initialize: function (elId, entityId) {
                _.bindAll(this, 'localize', 'cancel', 'save', 'saveEntity', 'saveSuccess', 'saveFailure', 'delete');

                var self = this;
                self.el = elId;
                console.log(entityId);
                if (entityId) {
                    self.entityId = entityId;

                    var entity = new DonationModel({ id: self.entityId});
                    entity.fetch({
                        success: function (entity) {
                            self.model = entity;
                            self.render().localize();
                        }});
                } else {
                    self.render();
                }

                return this;
            },
            render: function () {
                var self = this;
                self.$el.empty();

                var donationTypes = self.model.getTypes();

                console.log('EVENT STATUS:  ' + self.viewModel.donation_status);

                // figure out better way to handle this.  Should be passing the viewModel not the model.  Binding fails on loadFromEntity
                var compiledTemplate = _.template(FormTemplate, { donation: self.model, donationTypes: donationTypes, _: _ });
                self.$el.append(compiledTemplate);


                //       self.viewModel.bindToForm();
                //       self.viewModel.loadFromEntity(self.model);

                self.localize();
                return this;
            },
            localize: function () {
                var self = this;

                // need to get culture from user prefs.
                self.siteText = i18n.getViewText('donation_edit', 'en-us');

                site.setPageHeader(self.siteText.pageHeader.title, self.siteText.pageHeader.description);
                site.setActiveNav("donations");

                var sectionText = this.siteText.form.sections;
                localizeFormSection('Donation-Basics', sectionText.basic);
                localizeFormSection('Donation-Location', sectionText.location);
                localizeFormSection('Donation-Contact', sectionText.contact);

                var formElementText = this.siteText.form.elements;
                localizeFormElement('title', formElementText.title);
                localizeFormElement('description', formElementText.description);
                localizeFormElement('status', formElementText.status);
                localizeFormElement('tags', formElementText.tags);
                localizeFormElement('type', formElementText.type);
                localizeFormElement('address1', formElementText.address1);
                localizeFormElement('city', formElementText.city);
                localizeFormElement('state', formElementText.state);
                localizeFormElement('postal_code', formElementText.postal_code);
                localizeFormElement('country', formElementText.country);
                localizeFormElement('latitude', formElementText.latitude);
                localizeFormElement('longitude', formElementText.longitude);

                var buttonText = this.siteText.buttons;
                if (self.entityId) {
                    localizeButton('save', buttonText.save);
                } else {
                    localizeButton('save', buttonText.add);
                }
                localizeButton('cancel', buttonText.cancel);
                localizeButton('delete', buttonText.delete);

                // localization operations
                function localizeFormElement(fieldName, textNode) {
                    $("[for='" + fieldName + "']").text(textNode.label);
                    $("[name='" + fieldName + "']").attr('placeholder', textNode.placeholder);
                }

                function localizeFormSection(sectionName, textNode) {
                    $("fieldset#" + sectionName + " > legend").text(textNode.label);
                    //$("[name='" + fieldName + "']").attr('placeholder', textNode.placeholder);
                }

                function localizeButton(buttonName, textNode) {
                    $("[name='" + buttonName + "']").text(textNode.label);
                }

                return this;
            },
            donations: {
                "click #Save-Button": "save",
                "click #Cancel-Button": "cancel",
                "click #Delete-Button": "delete"
            },
            cancel: function () {
                history.back();
            },
            save: function () {
                var self = this;

                if (self.viewModel.get("_is_dirty") === false) {
                    alert('nothing to save');
                    return;
                }

                self.viewModel.validate(function (validationMessages) {
                    if (validationMessages.length) {
                        showValidationErrors(validationMessages);
                        return;
                    }
                    var entityToSave;
                    if (self.viewModel.get("_is_address_validated") !== true) {
                        var addressArray = [];
                        addressArray.push(self.viewModel.get("location_address1"));
                        addressArray.push(self.viewModel.get("location_city"));
                        addressArray.push(self.viewModel.get("location_state"));
                        addressArray.push(self.viewModel.get("location_postal_code"));
                        addressArray.push(self.viewModel.get("location_country"));

                        var addressString = addressArray.join(' ');
                        maps.codeAddress(addressString, function (geocode) {
                            if (geocode.results.length === 0) {
                                showAddressErrors();
                                alert('invalid address' + addressString);
                                console.log('no results');
                                return;
                            }
                            if (geocode.results.length > 1) {
                                alert('Multiple results found.  Show selector.');
                                return;
                            }
                            if (geocode.status != 'OK') {
                                showAddressErrors();
                                alert('invalid address' + addressString);
                                console.log("status:  " + geocode.status);
                                return;
                            }
                            if (geocode.results[0].partial_match === true) {
                                showAddressErrors();
                                alert('invalid address' + addressString);
                                console.log("partial_match:  " + geocode.results[0].partial_match);
                                return;
                            }
                            if (geocode.results.length == 1) {
                                self.viewModel.set("_is_address_validated", true);
                                clearAddressErrors();
                                entityToSave = self.viewModel.saveToEntity(self.model, geocode.results[0], self.saveEntity);
                            }
                        });
                    } else {
                        entityToSave = self.viewModel.saveToEntity(self.model, null, self.saveEntity);
                    }
                });
            },
            saveEntity: function (entity) {
                var self = this;
                entity.save(null, {success: self.saveSuccess, error: self.saveFailure});
            },
            delete: function () {
                window.location.href = "#/donation/delete/" + this.entityId;
            },
            saveSuccess: function (model, response) {
                console.log('MODEL:  ' + model);
                console.log('RESPONSE:  ' + response);
                this.viewModel.loadFromEntity(model);
                this.render();
                alert('Donation saved successfully!!');
                var id = model.get("_id");
                if (id) {
                    window.location.href = "#/donation/" + model.get("_id");
                } else {
                    window.location.href = "#/donations/";
                }
            },
            saveFailure: function (model, response) {
                console.log('MODEL:  ' + model);
                console.log('RESPONSE:  ' + response);
                alert('Donation saved failed!!');
            }
        });

        function showValidationErrors(validationMessages) {
            for (var v = 0; v < validationMessages.length; v++) {
                var field = $('[data-bind-donation="' + validationMessages[v][0] + '"]');
                field.parent().parent().addClass("has-error");
            }
        }

        function showAddressErrors() {
            var fields = $('[data-bind-donation^="location"]');
            for (var v = 0; v < fields.length; v++) {
                var field = fields[v];
                $(field).parent().parent().addClass("has-error");
            }
        }

        function clearAddressErrors() {
            var fields = $('[data-bind-donation^="location"]');
            for (var v = 0; v < fields.length; v++) {
                var field = fields[v];
                $(field).parent().parent().removeClass("has-error");
            }
        }
    });