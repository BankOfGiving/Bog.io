define([
    'jquery',
    'underscore',
    'backbone',
    'bog',

    'views/home/view',
    'views/events/view',
    'views/event/view'

//    'views/donations/list.all.donations',
//    'views/donations/detail.donation',
//
//    'views/events/list.all.events',
//    'views/events/detail.event',
//
//    'views/solicitations/list.all.solicitations',
//    'views/solicitations/detail.solicitation'
], function ($, _, Backbone, bog, home_view, events_view, event_view

             //    DonationsListView,
             //    DonationDetailView,
             //
             //    EventsListView,
             //    EventDetailView,
             //
             //    SolicitationsListView,
             //    SolicitationDetailView
    ) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            'logout': 'logout',
            'profile': 'userProfileView',
            'profile/edit': 'userProfileEdit',

            // Donations
            'donations': 'donationsList',
            'donation/:id': 'donationDetail',

            // Events
            'events': 'events',
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
        var container = $('#page-container');
        // main
        app_router.on('route:home', function () {
            new home_view({ el: container });
        });

        app_router.on('route:events', function () {
            new events_view({ el: container });
        });

        /*
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

         events
         app_router.on('route:eventsList', function () {
         site.transitionToSiteDefaultContainer();
         var donationsListView = new DonationsListView();
         donationsListView.render();
         });
         app_router.on('route:donationDetail', function () {
         site.transitionToSiteDefaultContainer();
         var donationsListView = new DonationsListView();
         donationsListView.render();
         });
         */
        /*
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

         events
         app_router.on('route:eventsList', function () {
         site.transitionToSiteDefaultContainer();
         var donationsListView = new DonationsListView();
         donationsListView.render();
         });
         app_router.on('route:donationDetail', function () {
         site.transitionToSiteDefaultContainer();
         var donationsListView = new DonationsListView();
         donationsListView.render();
         });
         */
//            site.transitionToSiteDefaultContainer();
//            var donationsListView = new DonationsListView();
//            donationsListView.render();
//        });
//        app_router.on('route:donationDetail', function (id) {
//            site.transitionToSiteDefaultContainer();
//            var donationDetailView = new DonationDetailView();
//            donationDetailView.render(id);
//        });
//
//        // events
//        app_router.on('route:eventDetail', function (id) {
//            site.transitionToSiteDefaultContainer();
//            var eventDetailView = new EventDetailView();
//            eventDetailView.render(id);
//        });
//
//        // solicitations
//        app_router.on('route:solicitationsList', function () {
//            site.transitionToSiteDefaultContainer();
//            var solicitationsListView = new SolicitationsListView();
//            solicitationsListView.render();
//        });
//        app_router.on('route:solicitationDetail', function (id) {
//            site.transitionToSiteDefaultContainer();
//            var solicitationDetailView = new SolicitationDetailView();
//            solicitationDetailView.render(id);
//        });

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