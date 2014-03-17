define([ 'jquery', 'underscore', 'backbone', 'bootstrap', 'postal', 'bog', 'text!./layout.html',

    'modules/column-container/module',
    'modules/event-display/module',
    //'modules/map/module',
    'modules/map/module',
    'modules/masthead/module',
    'modules/nav/module',
    'modules/titlebar/module'
],
    function ($, _, Backbone, bs, postal, bog, view_layout, column_container_module, event_display_module, map_module, masthead_module, nav_module, titlebar_module) {
        return Backbone.View.extend({
            initialize: function (o, id) {
                this.render(id);
            },
            render: function (id) {
                var self = this;
                var mod_util = new bog.modules();

                // render home layout
                self.$el.empty();
                self.$el.append(view_layout);
                // -----------------------------------------------------------------------------------------------------
                var titlebar_manifest = new mod_util.manifest();
                titlebar_manifest.mod_type = 'titlebar';
                titlebar_manifest.uid = 'titlebar';
                self.append_module(titlebar_module, '#titlebar', titlebar_manifest);
                // -----------------------------------------------------------------------------------------------------
                var masthead_manifest = new mod_util.manifest();
                masthead_manifest.mod_type = 'masthead';
                masthead_manifest.uid = 'events';
                self.append_module(masthead_module, '#masthead', masthead_manifest);
                // -----------------------------------------------------------------------------------------------------
                // Column one
                // -----------------------------------------------------------------------------------------------------
                var left_column_manifest = new mod_util.manifest();
                left_column_manifest.mod_type = 'column';
                left_column_manifest.localize = false;
                left_column_manifest.uid = 'left-column';
                self.append_module(column_container_module, '#column-one', left_column_manifest, function (column) {
                    // -------------------------------------------------------------------------------------------------
                    var left_nav_manifest = new mod_util.manifest();
                    left_nav_manifest.mod_type = 'nav';
                    left_nav_manifest.uid = 'nav-left';
                    self.append_module(nav_module, column.modules, left_nav_manifest);
                });
                // -----------------------------------------------------------------------------------------------------
                // Column two
                // -----------------------------------------------------------------------------------------------------
                var center_column_manifest = new mod_util.manifest();
                center_column_manifest.mod_type = 'column';
                center_column_manifest.localize = false;
                center_column_manifest.uid = 'center-column';
                self.append_module(column_container_module, '#column-two', center_column_manifest, function (column) {
                    // -------------------------------------------------------------------------------------------------
                    var event_detail_manifest = new mod_util.manifest();
                    event_detail_manifest.mod_type = 'event-detail';
                    event_detail_manifest.uid = 'full';
                    event_detail_manifest.options.event_id = id;
                    self.append_module(event_display_module, column.modules, event_detail_manifest);
                });
                // -----------------------------------------------------------------------------------------------------
                // Column three
                // -----------------------------------------------------------------------------------------------------
                var right_column_manifest = new mod_util.manifest();
                right_column_manifest.mod_type = 'column';
                right_column_manifest.localize = false;
                right_column_manifest.uid = 'right-column';
                self.append_module(column_container_module, '#column-three', right_column_manifest, function (column) {
                    // -------------------------------------------------------------------------------------------------
                    var map_manifest = new mod_util.manifest();
                    map_manifest.mod_type = 'map';
                    map_manifest.uid = 'map-events';
                    map_manifest.localize = false;
                    map_manifest.pubsub.data_channel_id = 'pub';
                    map_manifest.pubsub.data_topic = 'search.results.events';
                    map_manifest.options = {
                        type: "static",
                        height: '628px',
                        width: '300px'
                    };
                    self.append_module(map_module, column.modules, map_manifest);
                });
                return this;
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
            localize: function () {
                i18n.localizeView(this.$el, 'pub_home');
            },
            events: {
                "click #Logout": "logout"
            },
            logout: function () {
                $.get(api.uri.auth.logout);
                window.location.href = "/";
            },
            load_column: function (manifest) {
                // Build a loader for column modules
            }
        });
    });