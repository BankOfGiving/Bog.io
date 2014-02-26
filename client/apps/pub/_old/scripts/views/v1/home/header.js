define([
    'jquery',
    'underscore',
    'backbone',

    'modules/bog.site',
    'modules/bog.session',
    'modules/bog.i18n',

    'text!../../../templates/v2/titlebar.public.html',
    'text!../../../templates/v2/titlebar.auth.html',
    'text!../../../templates/v2/masthead.html'
],
    function ($, _, Backbone, site, session, i18n, NavPubTemplate, NavAuthTemplate, Masthead) {
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

                this.$el.empty();
                if (isAuth) {
                    var navTemplate = _.template(NavAuthTemplate, { profile: self.model });
                    this.$el.append(navTemplate).append(Masthead);
                } else {
                    this.$el.append(NavPubTemplate).append(Masthead);
                }

                return this;
            },
            events: {
                "click #NavBar-Auth-Home": "goHome",
                "click #NavBar-Auth-Logout": "goLogout",
                "click #NavBar-Auth-Profile": "goProfile"
            },
            localize: function () {
                //i18n.localizeView(this.$el, 'pub_header');
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