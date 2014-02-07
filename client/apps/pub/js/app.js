define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'config/bog.api'
], function ($, _, Backbone, Router, ApiConfig) {
    var initialize = function () {

        // Pass in our Router module and call it's initialize function
        $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
            // options.url = 'http://lptp-win-dev01:5000/api/v1/' + options.url;
            options.url = ApiConfig.uri + options.url;
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

        function htmlEncode(value) {
            return $('<div/>').text(value).html();
        }

        function htmlDecode(value) {
            return $('<div/>').html(value).text();
        }

        Router.initialize();
    };

    return {
        initialize: initialize
    };
});