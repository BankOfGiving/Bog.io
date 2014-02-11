if (Bog === null) {
    var Bog = {
        admin: {
            views: {
                full: {},
                partial: {}
            }
        },
        models: {},
        collections: {},
        site: {}
    };
}

define([
    'jquery',
    '../../../../.',
    'backbone',
    'router'
], function ($, _, Backbone, Router) {

    var initialize = function () {

        // Pass in our Router module and call it's initialize function
        $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
            if (options.url.indexOf('googleapis.com') > -1) {
                // options.url = options.url;  // execute the google api call as is.
            } else {
                options.url = '/admin/api/' + options.url;  // prepend the local api uri
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
