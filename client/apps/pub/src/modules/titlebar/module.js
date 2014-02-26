define([
    'jquery',
    'underscore',
    'backbone',

    'bog',

    'text!./titlebar.public.html',
    'text!./titlebar.auth.html'
],
    function ($, _, Backbone, bog, module_layout_public, module_layout_auth) {
        return Backbone.View.extend({
            initialize: function (el, o, callback) {
                bog.session.isAuthenticated(function (isAuth, user) {
                    self.isAuth = isAuth;
                    self.model = user;
                    self.render(isAuth).localize();
                });

                this.__init(el, o).render(function (self) {
                    if (callback) {
                        callback(self);
                    } else {
                        return self;
                    }
                });
            },
            render: function (callback) {
                var self = this;
                self.__render_module(module_layout, window.current_culture, function () {
                    if (callback) {
                        callback(self);
                    } else {
                        return self;
                    }
                });

                return self;
            }

            initialize: function () {
                var self = this;

                _.bindAll(this, 'localize');


            },
            render: function (isAuth) {
                var self = this;

                this.$el.empty();
                if (isAuth) {
                    var navTemplate = _.template(module_layout_auth, { profile: self.model });
                    this.$el.append(navTemplate);
                } else {
                    this.$el.append(module_layout_public);
                }

                return this;
            },
            events: {
                "click .culture-switch": "change_culture",

                "click #NavBar-Auth-Home": "goHome",
                "click #NavBar-Auth-Logout": "goLogout",
                "click #NavBar-Auth-Profile": "goProfile"
            },
            change_culture: function (e) {
                e.preventDefault();
                var i18n = new bog.i18n();
                var new_culture = e.currentTarget.getAttribute("data-value");
                i18n.change_culture(new_culture);
                $("#current_culture_icon").addClass("icon-" + new_culture);
                console.log("icon-" + new_culture);
            },
            goHome: function (e) {
                e.preventDefault();
                bog.site.setActiveNav('home');
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