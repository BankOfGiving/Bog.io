define([ 'jquery', 'underscorejs', 'backbone', 'postal', 'bog', 'views/home/view', 'views/events/view', 'views/event/view', 'views/event-form/view'
], function ($, _, Backbone, postal, bog, home_view, events_view, event_view, event_form_view) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            'events': 'events',
            'event/add': 'event_add',
            'event/:id': 'event_view',
            'event/:id/edit': 'event_edit',
            'event/:id/delete': 'event_delete',

            // Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function () {
        window.app = 'dash';
        var app_router = new AppRouter();
        var container = $('#page-container');
        app_router.on('route:home', function () {
            new home_view({ el: container });
        });
        app_router.on('route:events', function () {
            new events_view({ el: container });
        });
        app_router.on('route:event_add', function () {
            new event_form_view({ el: container });
        });
        app_router.on('route:event_edit', function (id) {
            new event_form_view({ el: container }, id);
        });
        app_router.on('route:event_view', function (id) {
            new event_view({ el: container }, id);
        });
        app_router.on('route:event_delete', function (id) {
            new event_view({ el: container }, id);
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