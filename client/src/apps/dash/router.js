define([ 'jquery', 'underscore', 'backbone', 'postal' ],
    function ($, _, Backbone, postal) {
        var AppRouter = Backbone.Router.extend({
            routes: {
                '': 'home',
                'events': 'events',
                'events/add': 'event_add',
                'events/:id': 'event_view',
                'events/:id/edit': 'event_edit',
                'events/:id/delete': 'event_delete',
                'donations': 'donations',
                'donations/create': 'donation_add',
                'donations/create/1a05c520': 'donation_wizard_intro',
                'donations/create/e6cf0b1d': 'donation_wizard_type',
                'donations/create/72260b8a': 'donation_wizard_goods_details',
                'donations/create/33401573': 'donation_wizard_goods_contact',
                'donations/create/dcc65983': 'donation_wizard_goods_local',
                'donations/create/7c74eba6': 'donation_wizard_goods_shipping_required',
                'donations/create/7e28f3a7': 'donation_wizard_goods_shipping_included',
                'donations/create/5e9e89cb': 'donation_wizard_goods_location',
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
            app_router.on('route:donation_wizard_intro', function () {
                require(['views/donation-wizard/view'], function (view) {
                    new view({ el: container, step: 'intro', model: window.global_view_persistence });
                });
            });
            app_router.on('route:donation_wizard_type', function () {
                require(['views/donation-wizard/view'], function (view) {
                    new view({ el: container, step: 'type', model: window.global_view_persistence });
                });
            });
            app_router.on('route:donation_wizard_goods_details', function () {
                require(['views/donation-wizard/view'], function (view) {
                    new view({ el: container, step: 'goods-details', model: window.global_view_persistence});
                });
            });
            app_router.on('route:donation_wizard_goods_contact', function () {
                require(['views/donation-wizard/view'], function (view) {
                    new view({ el: container, step: 'goods-contact', model: window.global_view_persistence});
                });
            });
            app_router.on('route:donation_wizard_goods_local', function () {
                require(['views/donation-wizard/view'], function (view) {
                    new view({ el: container, step: 'goods-local-only', model: window.global_view_persistence});
                });
            });
            app_router.on('route:donation_wizard_goods_shipping_required', function () {
                require(['views/donation-wizard/view'], function (view) {
                    new view({ el: container, step: 'goods-shipping-required', model: window.global_view_persistence});
                });
            });
            app_router.on('route:donation_wizard_goods_shipping_included', function () {
                require(['views/donation-wizard/view'], function (view) {
                    new view({ el: container, step: 'goods-shipping-included', model: window.global_view_persistence});
                });
            });
            app_router.on('route:donation_wizard_goods_location', function () {
                require(['views/donation-wizard/view'], function (view) {
                    new view({ el: container, step: 'goods-location', model: window.global_view_persistence});
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