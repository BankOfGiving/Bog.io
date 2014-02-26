define(['jquery', 'underscore', 'backbone', 'modules/bog.site', 'modules/bog.session', 'modules/bog.i18n', 'text!../../../templates/shared/header.dash.html', 'text!../../../templates/shared/titlebar.public.html', 'text!../../../templates/shared/titlebar.auth.html'],
    function ($, _, Backbone, site, session, i18n, DashboardHeaderTemplate, NavPubTemplate, NavAuthTemplate) {
        return Backbone.View.extend({
            initialize: function () {
                var self = this;

                _.bindAll(this, 'localize');

                session.isAuthenticated(function (isAuth, user) {
                    self.isAuth = isAuth;
                    self.model = user;
                    self.render(isAuth).localize();
                });
            },
            render: function (isAuth) {
                var self = this;

                var navTemplate;
                if (isAuth) {
                    navTemplate = _.template(NavAuthTemplate, { profile: self.model });
                } else {
                    navTemplate = NavPubTemplate;
                }

                this.$el.empty();
                this.$el.append(DashboardHeaderTemplate);
                this.$el.children("#navbar-container").append(navTemplate);
                return this;
            },
            events: {
                "click #NavBar-Auth-Donations": "goDonations",
                "click #NavBar-Auth-Events": "goEvents",
                "click #NavBar-Auth-Home": "goHome",
                "click #NavBar-Auth-Logout": "goLogout",
                "click #NavBar-Auth-Profile": "goProfile",
                "click #NavBar-Auth-Solicitations": "goSolicitations"
            },
            localize: function () {
                i18n.localizeView(this.$el, 'dash_header');
            },

            goEvents: function (e) {
                e.preventDefault();
                site.setActiveNav('events');
                window.location.href = '#/events/';
            },
            goDonations: function (e) {
                e.preventDefault();
                site.setActiveNav('dontations');
                window.location.href = '#/dontations/';
            },
            goSolicitations: function (e) {
                e.preventDefault();
                site.setActiveNav('solicitations');
                window.location.href = '#/solicitations/';
            },
            goHome: function (e) {
                e.preventDefault();
                site.setActiveNav('home');
                window.location.href = '#/';
            },
            goProfile: function (e) {
                e.preventDefault();
                window.location.href = '#/profile/';
            },
            goLogout: function (e) {
                e.preventDefault();
                window.location.href = '#/logout';
            }
        });
    });