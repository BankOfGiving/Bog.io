define([ 'module_base', 'text!./titlebar.public.html', 'text!./titlebar.auth.html' ], function (mod_base, module_layout_public, module_layout_auth) {
    return mod_base.extend({
        api_root: "/api/mod/titlebar",
        initialize: function (el, o, callback) {
            var self = this;
            var culture = window.culture || 'en-US';
            self.base_initialize(el, o, function () {
                bog.session.isAuthenticated(function (authenticated, user) {
                    var module_layout;
                    self.manifest.options.authenticated = authenticated;
                    if (authenticated) {
                        self.manifest.options.user = user;
                        module_layout = module_layout_auth;
                    } else {
                        module_layout = module_layout_public;
                    }
                    self.base_render(module_layout, culture, function () {
                        self.set_active_culture(culture);
                        if (callback) {
                            callback(self);
                        }
                    });
                });
            });
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
            this.loc_channel.publish({
                topic: 'set-culture',
                data: new_culture
            });
            this.set_active_culture(new_culture);
        },
        set_active_culture: function (culture) {
            // $("#current_culture_icon").removeClass().addClass("icon-" + culture);
            $("#current_culture_icon").text(culture);
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