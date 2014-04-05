define([ 'jquery', 'underscorejs', 'backbone', 'router', 'bog'],
    function ($, _, Backbone, router, bog) {
        var initialize = function () {
            $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
                if (options.url.indexOf('://') === -1) {
                    options.url = bog.api.uri.base.dash + options.url;
                }
            });
            $.fn.serializeObject = function () {
                var o = {};
                var a = this.serializeArray();
                $.each(a, function () {
                    if (o[this.name] !== undefined) {
                        if (!o[this.name].push) {
                            o[this.name] = [o[this.name]];
                        }
                        o[this.name].push(this.value || '');
                    } else {
                        o[this.name] = this.value || '';
                    }
                });
                return o;
            };

            router.initialize();
        };

        return {
            initialize: initialize
        };
    });