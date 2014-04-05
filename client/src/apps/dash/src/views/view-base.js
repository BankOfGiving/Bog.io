define([ 'jquery', 'under', 'backbone', 'bootstrap', 'postal', 'bog' ], function ($, _, Backbone, bs, postal, bog) {
    return Backbone.View.extend({
        initialize: function () {
        },
        append_module: function (module, container, manifest, callback) {
            var self = this;
            new module($(container), manifest, function (module_instance) {
                if (module_instance) {
                    self.register_view_module(module_instance.key, manifest.localize);
                    if (callback) {
                        callback(module_instance);
                    } else {
                        return module_instance;
                    }
                }
            });
        },
        register_view_module: function (key, localize) {
            window.mod_list.push([key, localize]);
            postal.publish({
                channel: 'debug',
                topic: 'module-register',
                data: window.mod_list
            });
            return key;
        },
        load_column: function (manifest) {
            // Build a loader for column modules
        }
    });
});