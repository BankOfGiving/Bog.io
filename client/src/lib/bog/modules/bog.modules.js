if (!bog) {
    var bog = {};
}
bog.modules = function () {
    var get_manifest_template = function () {
        return {
            app: window.app,                // the app identifier
            mod_type: '',                   // module type must match a registered module name
            uid: '',                        // unique identifier of the module instance
            title: '',                      // force the description (not used on all modules)
            description: '',                // force the description (not used on all modules)
            culture: '',                    // force the culture
            localize: true,                 // set to false to prevent api call to retrieve text
            clean: false,                   // clean other markup in the container
            pubsub: {
                data_channel_id: '',        //
                data_topic: '',             //
                loc_channel_id: '',         //
                loc_topic: ''               //
            },
            options: {}                     // contains all module specific settings and configuration
        };
    };

    var register_view_module = function (key, localize) {
        window.mod_list.push([key, localize]);
        require(['postal'], function (postal) {
            postal.publish({
                channel: 'debug',
                topic: 'module-register',
                data: window.mod_list
            });
        });
        return key;
    };

    return {
        manifest: get_manifest_template,
        register: register_view_module
    };
};