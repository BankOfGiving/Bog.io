define(['jquery', 'underscore', 'backbone', 'postal', 'text!./mod-debug.html'],
    function ($, _, Backbone, postal, module_template) {
        return Backbone.View.extend({
            initialize: function () {
                this.render();
            },
            render: function () {
                var self = this;

                self.$el.append(module_template);
                var debug_console = $('#debug-console');
                postal.subscribe({
                    channel: 'debug',
                    topic: 'module-view',
                    callback: function (data, envelope) {
                        debug_console.append(envelope.timeStamp + ': ' + data + '<br>');
//                        if(envelope.module_manifest){
//                            debug_console.append('  manifest:' + envelope.module_manifest + '<br>');
//                        }
                        debug_console.append('----------------------------------------------' + '<br>');
                    }
                });

                var module_register = $('#module-register');
                postal.subscribe({
                    channel: 'debug',
                    topic: 'module-register',
                    callback: function (data) {
                        module_register.empty();
                        for (var i = 0; i < data.length; i++) {
                            module_register.append(data[i] + '<br>');
                        }
                    }
                });
                return this;
            }
        });
    });