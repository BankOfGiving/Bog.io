define([ 'jquery', 'underscore', 'backbone', 'postal' ],
    function ($, _, Backbone, postal) {
        var AppRouter = Backbone.Router.extend({
            routes: {
                '': 'home',
                '_=_': 'home',
                'events': 'events',
                'events/add': 'event_add',
                'events/:id': 'event_view',
                'events/:id/edit': 'event_edit',
                'events/:id/delete': 'event_delete',
                'donations': 'donations',
                'donations/listings': 'donations_listings',
                'donations/following': 'donations_following',
                'donations/requested': 'donations_requested',

                'donations/create': 'donation_add',
                'donations/create/wizard': 'donation_add_wizard',

                'donations/:id': 'donation_view',
                'donations/:id/edit': 'donation_edit',
                'donations/:id/delete': 'donation_delete',

                // Default
                '*actions': 'defaultAction'
            }
        });

        var initialize = function () {
            window.app = 'dash';
            var app_router = new AppRouter();
            var container = $('#page-container');

            app_router.on('route:home', function () {
                require(['views/home/view'], function (view) {
                    new view({ el: container });
                });
            });
            //-----------------------------------------------------------------------------------------
            // EVENTS
            //-----------------------------------------------------------------------------------------
            app_router.on('route:events', function () {
                require(['views/events/view'], function (view) {
                    new view({ el: container });
                });
            });
            app_router.on('route:event_add', function () {
                require(['views/event-form/view'], function (view) {
                    new view({ el: container });
                });
            });
            app_router.on('route:event_edit', function (id) {
                require(['views/event-form/view'], function (view) {
                    new view({ el: container }, id);
                });
            });
            app_router.on('route:event_view', function (id) {
                require(['views/event/view'], function (view) {
                    new view({ el: container }, id);
                });
            });
            app_router.on('route:event_delete', function (id) {
                require(['views/event/view'], function (view) {
                    new view({ el: container }, id);
                });
            });

            //-----------------------------------------------------------------------------------------
            // DONATIONS
            //-----------------------------------------------------------------------------------------
            app_router.on('route:donations', function () {
                require(['views/donations/view'], function (view) {
                    new view({ el: container });
                });
            });
            app_router.on('route:donation_add', function () {
                require(['views/donation-form/view'], function (view) {
                    new view({ el: container });
                });
            });
            app_router.on('route:donation_add_wizard', function () {
                require(['views/donation-wizard/view'], function (view) {
                    new view({ el: container, step: 'intro', model: window.global_view_persistence });
                });
            });
            app_router.on('route:donation_edit', function (id) {
                require(['views/donation-form/view'], function (view) {
                    new view({ el: container }, id);
                });
            });
            app_router.on('route:donation_view', function (id) {
                require(['views/donation/view'], function (view) {
                    new view({ el: container }, id);
                });
            });
            app_router.on('route:donation_delete', function (id) {
                require(['views/donation/view'], function (view) {
                    new view({ el: container }, id);
                });
            });
            //-----------------------------------------------------------------------------------------
            // FALLTHROUGH
            //-----------------------------------------------------------------------------------------
            app_router.on('route:defaultAction', function (actions) {
                console.log('No route:', actions);
            });
            Backbone.history.start();

            var self = this;
            postal.subscribe({
                channel: "persistence",
                topic: "donation-wizard",
                callback: function (work) {
                    work.updateTime = Date.now();
                    if (work.version) {
                        work.version = work.version + 1;
                    } else {
                        work.version = 0;
                    }
                    window.global_view_persistence = work;
                }
            });
        };

        return {
            initialize: initialize
        };
    });