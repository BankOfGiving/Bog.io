if (!bog) {
    var bog = {};
}
bog.modules = function () {
    var get_manifest_template = function () {
        return {
            app: window.app,
            mod_type: '',
            uid: '',
            title: '',
            description: '',
            culture: '',
            localize: true,
            pubsub: {
                data_channel_id: '',
                data_topic: '',
                loc_channel_id: '',
                loc_topic: ''
            },
            options: {}
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