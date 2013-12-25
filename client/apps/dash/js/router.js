/**
 * Created by dbaxter on 12/1/13.
 */
// Filename: router.js
define([ 'jquery', 'underscore', 'backbone', 'bog', 'bog.session', 'bog.site',
    'views/home/landing',
    'views/home/home',
    'views/shared/header.dash',

    'views/profile/profile.view',
    'views/profile/profile.edit',

    'views/donations/donations.list',
    'views/donations/donation.detail',
    'views/donations/donation.form',

    'views/events/events.list',
    'views/events/event.detail',
    'views/events/event.form',

    'views/solicitations/solicitations.list',
    'views/solicitations/solicitation.detail',
    'views/solicitations/solicitation.form'

], function ($, _, Backbone, bog, session, site, DashLandingView, DashHomeView, DashHeaderView, ProfileViewView, ProfileEditView, DonationsListView, DonationDetailView, DonationFormView, EventsListView, EventDetailView, EventFormView, SolicitationsListView, SolicitationDetailView, SolicitationFormView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            'logout': 'logout',
            'profile': 'userProfileView',
            'profile/edit': 'userProfileEdit',

            'donations/': 'userDonations',
            'donation/': 'userDonationAdd',
            'donation/:id': 'userDonationView',
            'donation/:id/delete': 'userDonationDelete',
            'donation/:id/edit': 'userDonationEdit',

            'events/': 'userEvents',
            'event/': 'userEventAdd',
            'event/:id': 'userEventView',
            'event/:id/delete': 'userEventDelete',
            'event/:id/edit': 'userEventEdit',

            'solicitations/': 'userSolicitations',
            'solicitation/': 'userSolicitationAdd',
            'solicitation/:id': 'userSolicitationView',
            'solicitation/:id/delete': 'userSolicitationDelete',
            'solicitation/:id/edit': 'userSolicitationEdit',

            // Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function () {
        var app_router = new AppRouter;
        var container = $('#site-container');
        var headerContainerId = '#site-header';
        var headerContainer = $('#site-header');
        var contentContainerId = '#page-content';
        var contentContainer = $(contentContainerId);

        var pageHeader = $('#page-header');

        app_router.on("route", function () {
            new DashHeaderView({ el: headerContainerId });
        });

        // main
        app_router.on('route:home', function () {
            session.isAuthenticated(function (result) {
                if (result) {
                    var homeView = new DashHomeView({ el: contentContainerId });
                } else {
                    var landingView = new DashLandingView({ el: contentContainerId });
                }
            });
        });

        // main
        app_router.on('route:logout', function () {
            session.logout(function (status) {
                if (status) {
                    window.location.href = '/';
                } else {
                    alert('Error while terminating session. Contact system admin.');
                }

            });
        });

        // Profile
        app_router.on('route:userProfileView', function () {
            var profileManageView = new ProfileViewView({ el: contentContainerId });
        });
        app_router.on('route:userProfileEdit', function () {
            var profileEditView = new ProfileEditView({ el: contentContainerId });
        });

        // Donations
        app_router.on('route:userDonations', function () {
            var donationsListView = new DonationsListView({ el: contentContainerId });
        });
        app_router.on('route:userDonationDelete', function (id) {
            var donationDeleteView = new DonationDeleteView({ el: contentContainerId, id: id });
        });
        app_router.on('route:userDonationAdd', function () {
            var donationAddView = new DonationAddView({ el: contentContainerId });
        });
        app_router.on('route:userDonationView', function (id) {
            var donationViewView = new DonationDetailView(contentContainer, id);
        });
        app_router.on('route:userDonationEdit', function (id) {
            var donationEditView = new DonationEditView(contentContainer, id);
        });

        // Events
        app_router.on('route:userEvents', function () {
            var eventsListView = new EventsListView({ el: contentContainerId });
        });
        app_router.on('route:userEventDelete', function (id) {
            var eventDeleteView = new EventDetailView({ el: contentContainerId, id: id });
        });
        app_router.on('route:userEventAdd', function () {
            var eventAddView = new EventFormView({ el: contentContainerId });
        });
        app_router.on('route:userEventView', function (id) {
            var eventViewView = new EventDetailView({ el: contentContainerId, id: id });
        });
        app_router.on('route:userEventEdit', function (id) {
            var eventEditView = new EventFormView({ el: contentContainerId, id: id });
        });


        app_router.on('route:userSolicitations', function () {
            var solicitationsListView = new SolicitationsListView();
            solicitationsListView.render(contentContainer);
        });
        app_router.on('route:userSolicitationDelete', function (id) {
            var solicitationDeleteView = new SolicitationDeleteView();
            solicitationDeleteView.render(contentContainer, id);
        });
        app_router.on('route:userSolicitationAdd', function () {
            var solicitationAddView = new SolicitationAddView();
            solicitationAddView.render(contentContainer);
        });
        app_router.on('route:userSolicitationView', function (id) {
            var solicitationViewView = new SolicitationDetailView();
            solicitationViewView.render(contentContainer, id);
        });
        app_router.on('route:userSolicitationEdit', function (id) {
            var solicitationEditView = new SolicitationEditView();
            solicitationEditView.render(contentContainer, id);
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