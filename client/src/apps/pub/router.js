define([ 'jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            'about': 'about',
            'events': 'events',
            'events/about/': 'events-overview',
            'event/:id': 'event',
            'donations': 'donations',
            'donations/about/': 'donations-overview',
            'donations/:id': 'donation',
            'solicitations/about/': 'solicitations-overview'
        }
    });

    var initialize = function () {
        window.app = 'pub';
        var app_router = new AppRouter();
        var container = $('#page-container');

        app_router.on('route:home', function () {
            require(['views/home/view'], function (view) {
                new view({ el: container });
            });
        });

        app_router.on('route:about', function () {
            require(['views/about/view'], function (view) {
                new view({ el: container });
            });
        });

        // ----------------------------------------------------------
        // EVENTS
        // ----------------------------------------------------------
        app_router.on('route:events', function () {
            require(['views/events/view'], function (view) {
                new view({ el: container });
            });
        });
        app_router.on('route:events-overview', function () {
            require(['views/events-overview/view'], function (view) {
                new view({ el: container });
            });
        });
        app_router.on('route:event', function (id) {
            require(['views/event/view'], function (view) {
                new view({ el: container }, id);
            });
        });

        // ----------------------------------------------------------
        // DONATIONS
        // ----------------------------------------------------------
        app_router.on('route:donations', function () {
            require(['views/donations/view'], function (view) {
                new view({ el: container });
            });
        });
        app_router.on('route:donations-overview', function () {
            require(['views/donations-overview/view'], function (view) {
                new view({ el: container });
            });
        });
        app_router.on('route:donation', function (id) {
            require(['views/donation/view'], function (view) {
                new view({ el: container }, id);
            });
        });

        // ----------------------------------------------------------
        // SOLICITATIONS
        // ----------------------------------------------------------
        app_router.on('route:solicitations', function () {
            require(['views/solicitations/view'], function (view) {
                new view({ el: container });
            });
        });
        app_router.on('route:solicitations-overview', function () {
            require(['views/solicitations-overview/view'], function (view) {
                new view({ el: container });
            });
        });
        app_router.on('route:solicitation', function (id) {
            require(['views/solicitation/view'], function (view) {
                new view({ el: container }, id);
            });
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