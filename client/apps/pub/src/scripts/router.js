define([
    'jquery',
    'underscore',
    'backbone',
    'modules/bog.session',
    'modules/bog.site',
    'views/home/landing',
    'views/home/titlebar',
    'views/donations/list.all.donations',
    'views/donations/detail.donation',
    'views/events/list.all.events',
    'views/events/detail.event',
    'views/solicitations/list.all.solicitations',
    'views/solicitations/detail.solicitation'
], function ($, _, Backbone, session, site, LandingView, TitleBarView, DonationsListView, DonationDetailView, EventsListView, EventDetailView, SolicitationsListView, SolicitationDetailView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            '': 'landing',

            // Donations
            'donations': 'donationsList',
            'donation/:id': 'donationDetail',

            // Events
            'events': 'eventsList',
            'events/:id': 'eventDetail',

            // Solicitations
            'solicitations': 'solicitationsList',
            'solicitations/:id': 'solicitationDetail',

            // Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function () {
        var app_router = new AppRouter();

        var titleBarView = new TitleBarView();
        titleBarView.render();

        // main
        app_router.on('route:landing', function () {
            site.transitionToSiteOverrideContainer();
            var landingView = new LandingView();
            landingView.render();
        });

        // donations
        app_router.on('route:donationsList', function () {
            site.transitionToSiteDefaultContainer();
            var donationsListView = new DonationsListView();
            donationsListView.render();
        });
        app_router.on('route:donationDetail', function (id) {
            site.transitionToSiteDefaultContainer();
            var donationDetailView = new DonationDetailView();
            donationDetailView.render(id);
        });

        // events
        app_router.on('route:eventsList', function () {
            site.transitionToSiteDefaultContainer();
            var eventsListView = new EventsListView();
            eventsListView.render();
        });
        app_router.on('route:eventDetail', function (id) {
            site.transitionToSiteDefaultContainer();
            var eventDetailView = new EventDetailView();
            eventDetailView.render(id);
        });

        // solicitations
        app_router.on('route:solicitationsList', function () {
            site.transitionToSiteDefaultContainer();
            var solicitationsListView = new SolicitationsListView();
            solicitationsListView.render();
        });
        app_router.on('route:solicitationDetail', function (id) {
            site.transitionToSiteDefaultContainer();
            var solicitationDetailView = new SolicitationDetailView();
            solicitationDetailView.render(id);
        });

        // events
//        app_router.on('route:eventsList', function () {
//            site.transitionToSiteDefaultContainer();
//            var donationsListView = new DonationsListView();
//            donationsListView.render();
//        });
//        app_router.on('route:donationDetail', function () {
//            site.transitionToSiteDefaultContainer();
//            var donationsListView = new DonationsListView();
//            donationsListView.render();
//        });

        app_router.on('route:defaultAction', function (actions) {
            console.log('No route:', actions);
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});