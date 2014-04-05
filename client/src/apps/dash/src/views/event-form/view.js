define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'postal',

    'bog',

    'text!./layout.html',

    'modules/column-container/module',
    'modules/event-form/module',
    'modules/map/module',
    'modules/markup/module',
    'modules/masthead/module',
    'modules/nav/module',
    'modules/separator/module',
    'modules/text/module',
    'modules/titlebar/module'
],
    function ($, _, Backbone, bs, postal, bog, view_layout, column_container_module, event_form_module, map_module, markup_module, masthead_module, nav_module, separator_module, text_module, titlebar_module) {
        return Backbone.View.extend({
            initialize: function (id) {
                this.render();
            },
            render: function () {
                var self = this;
                var mod_util = new bog.modules();

                // render home layout
                self.$el.empty();
                self.$el.append(view_layout);
                // -----------------------------------------------------------------------------------------------------
                var titlebar_manifest = new mod_util.manifest();
                titlebar_manifest.mod_type = 'titlebar';
                titlebar_manifest.uid = 'primary';
                self.append_module(titlebar_module, '#titlebar', titlebar_manifest);
                // -----------------------------------------------------------------------------------------------------
                var masthead_manifest = new mod_util.manifest();
                masthead_manifest.mod_type = 'masthead';
                masthead_manifest.uid = 'event-add';
                self.append_module(masthead_module, '#masthead', masthead_manifest);
                // -----------------------------------------------------------------------------------------------------
                // Column one
                // -----------------------------------------------------------------------------------------------------
                var left_column_manifest = new mod_util.manifest();
                left_column_manifest.mod_type = 'column';
                left_column_manifest.localize = false;
                left_column_manifest.uid = 'left';
                self.append_module(column_container_module, '#column-one', left_column_manifest, function (column) {
                    // -------------------------------------------------------------------------------------------------
                    var event_form_manifest = new mod_util.manifest();
                    event_form_manifest.mod_type = 'event-form';
                    event_form_manifest.uid = 'event-add';
                    self.append_module(event_form_module, column.modules, event_form_manifest);
                });

                //var modules = $("mod");
                //console.log(modules.length);
                //for(var i = modules.length; i>=0;i--){
                //console.log('modules: ' + i);
                //$(modules[i]).replaceWith('<div id="' + i + '"></div>');
                //}
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
            }
        });
    });