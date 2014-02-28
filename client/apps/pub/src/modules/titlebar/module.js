define([ 'module_base', 'text!./titlebar.public.html', 'text!./titlebar.auth.html' ], function (mod_base, module_layout_public, module_layout_auth) {
    return mod_base.extend({
        initialize: function (el, o, callback) {
            var self = this;
            self.__init(el, o).render(function (self) {
                if (callback) {
                    callback(self);
                } else {
                    return self;
                }
            });
        },
        render: function (callback) {
            var self = this;
            var i18n = new bog.i18n();
            bog.session.isAuthenticated(function (isAuth) {
                self.manifest.options.isAuth = isAuth;
                if (isAuth) {
                    self.template = module_layout_auth;
                } else {
                    self.template = module_layout_public;
                }
                i18n.get_culture(function (culture) {
                    self.__render_module(self.template, culture, function () {
                        self.set_active_culture(culture);
                        if (callback) {
                            callback(self);
                        } else {
                            return self;
                        }
                    });
                });
            });
            return self;
        },
        events: {
            "click .culture-switch": "change_culture",

            "click #NavBar-Auth-Home": "goHome",
            "click #NavBar-Auth-Logout": "goLogout",
            "click #NavBar-Auth-Profile": "goProfile"
        },
        change_culture: function (e) {
            e.preventDefault();
            var new_culture = e.currentTarget.getAttribute("data-value");
            console.log(new_culture);
            this.loc_channel.publish({
                topic: 'set-culture',
                data: new_culture
            });
            this.set_active_culture(new_culture);
        },
        set_active_culture: function (culture) {
            $("#current_culture_icon").removeClass().addClass("icon-" + culture).class;
            //$("#current_culture_icon").parent().text("icon-" + culture);
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