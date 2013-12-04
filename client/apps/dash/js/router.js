/**
 * Created by dbaxter on 12/1/13.
 */
// Filename: router.js
define([ 'jquery', 'underscore', 'backbone', 'bog.session', 'bog.site',
    'views/home/landing',
    'views/home/titlebar',
    'views/header/header.dash',

    'views/profile/profile.manage',
    'views/profile/profile.edit',

    'views/donations/donations.list',
    'views/donations/donation.delete',
    'views/donations/donation.add',
    'views/donations/donation.view',
    'views/donations/donation.edit',

    'views/events/events.list',
    'views/events/event.delete',
    'views/events/event.add',
    'views/events/event.view',
    'views/events/event.edit',

    'views/solicitations/solicitations.list',
    'views/solicitations/solicitation.delete',
    'views/solicitations/solicitation.add',
    'views/solicitations/solicitation.view',
    'views/solicitations/solicitation.edit',

], function($, _, Backbone, session, site,
        LandingView,
        TitleBarView,
        DashboardHeaderView,

        ProfileManageView,
        ProfileEditView,

        DonationsListView,
        DonationDeleteView,
        DonationAddView,
        DonationViewView,
        DonationEditView,

        EventsListView,
        EventDeleteView,
        EventAddView,
        EventViewView,
        EventEditView,

        SolicitationsListView,
        SolicitationDaveView,
        SolicitationAddView,
        SolicitationViewView,
        SolicitationEditView
    ){
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            '': 'landing',
            'profile': 'manageProfile',
            'profile/edit': 'editProfileEdit',

            'donations': 'userDonations',
            'donations/delete/:id': 'userDonationDelete',
            'donations/add': 'userDonationAdd',
            'donations/view/:id:': 'userDonationView',
            'donations/edit/:id': 'userDonationEdit',

            'events': 'userEvents',
            'events/delete/:id': 'userEventDelete',
            'events/add': 'userEventAdd',
            'events/view/:id:': 'userEventView',
            'events/edit/:id': 'userEventEdit',

            'solicitations': 'userSolicitations',
            'solicitations/delete/:id': 'userSolicitationDelete',
            'solicitations/add': 'userSolicitationAdd',
            'solicitations/view/:id:': 'userSolicitationView',
            'solicitations/edit/:id': 'userSolicitationEdit',

            // Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function(){
        var app_router = new AppRouter;
        var container = $('#site-container');
        var headerContainer = $('#site-header');
        var contentContainer = $('#site-content');

        site.transitionToSiteDefaultContainer();

        var titleBarView = new TitleBarView();
        titleBarView.render();

        var dashboardHeaderView = new DashboardHeaderView();
        dashboardHeaderView.render(headerContainer);

        // main
        app_router.on('route:landing', function () {
            var landingView = new LandingView();
            landingView.render(contentContainer);
        });

        // Profile
        app_router.on('route:manageProfile', function () {
            var profileManageView = new ProfileManageView();
            profileManageView.render(contentContainer);
        });
        app_router.on('route:editProfile', function () {
            var profileEditView = new ProfileEditView();
            profileEditView.render(contentContainer);
        });

        // Donations
        app_router.on('route:userDonations', function () {
            var donationsListView = new DonationsListView();
            donationsListView.render(contentContainer);
        });
        app_router.on('route:userDonationDelete', function (id) {
            var donationDeleteView = new DonationDeleteView();
            donationDeleteView.render(contentContainer, id);
        });
        app_router.on('route:userDonationAdd', function () {
            var donationAddView = new DonationAddView();
            donationAddView.render(contentContainer);
        });
        app_router.on('route:userDonationView', function (id) {
            var donationViewView = new DonationViewView();
            donationViewView.render(contentContainer, id);
        });
        app_router.on('route:userDonationEdit', function (id) {
            var donationEditView = new DonationEditView();
            donationEditView.render(contentContainer, id);
        });

        // Events
        app_router.on('route:userEvents', function () {
            var eventsListView = new EventsListView();
            eventsListView.render(contentContainer);
        });
        app_router.on('route:userEventDelete', function (id) {
            var eventDeleteView = new EventDeleteView();
            eventDeleteView.render(contentContainer, id);
        });
        app_router.on('route:userEventAdd', function () {
            var eventAddView = new EventAddView();
            eventAddView.render(contentContainer);
        });
        app_router.on('route:userEventView', function (id) {
            var eventViewView = new EventViewView();
            eventViewView.render(contentContainer, id);
        });
        app_router.on('route:userEventEdit', function (id) {
            var eventEditView = new EventEditView();
            eventEditView.render(contentContainer, id);
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
            var solicitationViewView = new SolicitationViewView();
            solicitationViewView.render(contentContainer, id);
        });
        app_router.on('route:userSolicitationEdit', function (id) {
            var solicitationEditView = new SolicitationEditView();
            solicitationEditView.render(contentContainer, id);
        });

        app_router.on('route:defaultAction', function(actions){
            console.log('No route:', actions);
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});