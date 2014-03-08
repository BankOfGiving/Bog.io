define([ 'jquery', 'underscore', 'backbone', 'postal', 'bog', 'views/home/view', 'views/events/view', 'views/event-form/view'
], function ($, _, Backbone, postal, bog, home_view, events_view, event_form_view) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            'events': 'events',
            'events/add': 'events_add',

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
        app_router.on('route:events', function () {
            new events_view({ el: container });
        });
        app_router.on('route:events_add', function () {
            new event_form_view({ el: container });
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