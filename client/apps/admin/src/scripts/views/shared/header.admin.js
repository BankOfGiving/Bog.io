define(['jquery', 'underscore', 'backbone', 'modules/bog.site', 'modules/bog.i18n', 'text!../../../templates/shared/header.admin.html', 'text!../../../templates/shared/titlebar.auth.html'
], function ($, _, Backbone, site, i18n, AdminHeaderTemplate, TitlebarAuthTemplate) {
    return Backbone.View.extend({
        initialize: function () {
            var self = this;
            self.render().localize();
        },
        render: function () {

            var navTemplate;
            navTemplate = _.template(TitlebarAuthTemplate);

            this.$el.empty();
            this.$el.append(AdminHeaderTemplate);
            this.$el.children("#navbar-container").append(navTemplate);
            return this;
        },
        events: {
            "click #NavBar-Auth-Donations": "goDonations",
            "click #NavBar-Auth-Events": "goEvents",
            "click #NavBar-Auth-Home": "goHome",
            "click #NavBar-Auth-Logout": "goLogout",
            "click #NavBar-Auth-Profile": "goProfile",
            "click #NavBar-Auth-Solicitations": "goSolicitations",

            "click #Login-Facebook": "FBAuth",
            "click #Login-Google": "FBAuth",
            "click #Login-Twitter": "FBAuth"
        },
        localize: function () {
            i18n.localizeView(this.$el, 'admin_header');
        },
        FBAuth: function (e) {
            e.preventDefault();
            session.launchAuth('fb');
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