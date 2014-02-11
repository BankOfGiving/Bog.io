define(['jquery', '../../../../../.', 'backbone'], function ($, _, Backbone) {
    return Backbone.Model.extend({
        urlRoot: 'event/',
        types: [
            { value: 'food', name: 'Food Distribution', description: '' },
            { value: 'job', name: 'Career Assistance', description: ''  },
            { value: 'health', name: 'Health & Wellness', description: ''  },
            { value: 'training', name: 'Training & Education', description: '' },
            { value: 'other', name: 'Other', description: '' }
        ],
        getTypes: function () {
            return this.types;
        },
        bindToForm: function () {
            this._binder = new this.addDataBinder(this, 'event');
        },
        addDataBinder: function (vm, section) {
            // Use a jQuery object as simple PubSub
            var _binder = jQuery({});

            // We expect a `data` element specifying the binding
            // in the form: data-bind-<object_id>="<property_name>"
            var data_attr = "bind-" + section,
                message = section + ":change";

            // Listen to change events on elements with the data-binding attribute and proxy
            // them to the PubSub, so that the change is "broadcast" to all connected objects
            console.log("[data-" + data_attr + "=" + section + "]");
            jQuery(document).on("change", "[data-" + data_attr + "]", function (evt) {
                var $input = jQuery(this);

                _binder.trigger(message, [ $input.data(data_attr), $input.val() ]);
            });

            _binder.on(message, function (evt, prop_name, new_val) {
                jQuery("[data-" + data_attr + "=" + prop_name + "]").each(function () {
                    var $bound = jQuery(this);
                    if ($bound.val() !== '' && $bound.val() != new_val) {
                    }

                    if ($bound.is("input, textarea, select")) {
                        $bound.val(new_val);
                    } else {
                        $bound.html(new_val);
                    }
                });
            });

            // Subscribe to the PubSub
            _binder.on(section + ":change", function (evt, attr_name, new_val, initiator) {
                console.log("model value:  " + vm.get(attr_name));
                var hasChanged = $.trim(new_val) != $.trim(vm.get(attr_name));
                var isDirty = vm.get("_is_dirty");
                var isAddressValidated = vm.get("_is_address_validated");

                if (initiator !== vm) {
                    if (isDirty !== true) {
                        // if an address field has changed, mark the model for geocoding.
//                        if(attr_name.indexOf('location_') > -1) {
//                            if(hasChanged && isAddressValidated){
//                                vm.set("_is_address_validated", false);
//                                console.log(section + ' address must be validated before save.');
//                            }
//                        }

                        // if something has changed, trip the dirty flag.
                        if (hasChanged) {
                            vm.set("_is_dirty", true);
                            console.log(section + ' view model is dirty');
                        }
                    }
                    // if validation has decorated the form group, remove the decoration when the user changed value.
                    if (hasChanged) {
                        var fieldContainer = $('[data-bind-' + section + '="' + attr_name + '"]').parent().parent();
                        if (fieldContainer.hasClass("has-error")) {
                            fieldContainer.removeClass("has-error");
                        }
                    }
                    vm.set(attr_name, new_val);
                }
            });
        }
//        validate: function(callback){
//            var validationMessages = []; // [field, message]
//            // validationMessages.push(['event_title', 'you need a better title.']);
//            callback(validationMessages);
//        }
    });
});