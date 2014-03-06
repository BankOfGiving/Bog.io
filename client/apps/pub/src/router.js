define([
    'jquery',
    'underscore',
    'backbone',
    'postal',
    'bog',

    'views/home/view',
], function ($, _, Backbone, postal, bog, home_view) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            'logout': 'logout',
            'profile': 'userProfileView',
            'profile/edit': 'userProfileEdit',

            // Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function () {
        var app_router = new AppRouter();
        var container = $('#page-container');
        app_router.on('route:home', function () {
            new home_view({ el: container });
        });

        app_router.on('route:defaultAction', function (actions) {
            console.log('No route:', actions);
        });

        Backbone.history.start();

    };

    return {
        initialize: initialize
    };
});