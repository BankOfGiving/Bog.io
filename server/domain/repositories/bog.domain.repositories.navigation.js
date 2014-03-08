var _base = require('./bog.domain.repositories._base.js');

var NavigationRepository = function (current_user) {
    // TODO:  Move navigation to database.  Add functionality for permission filtered result sets.

    var Pub = function (nav_type) {
        switch (nav_type) {
            default:
                return [
                    { link: '#/events', label: 'Events', key: 'nav.events', new_window: 'false', class: '' },
                    { link: '#/donations', label: 'Donations', key: 'nav.donations', new_window: 'false', class: '' },
                    { link: '#/solicitations', label: 'Solicitations', key: 'nav.solicitations', new_window: 'false', class: '' },
                    { link: '#/blog', label: 'Blog', key: 'nav.blog', new_window: 'false', class: '' },
                    { link: '#/philosophy', label: 'Philosophy', key: 'nav.philosophy', new_window: 'false', class: '' },
                    { link: '#/about', label: 'About', key: 'nav.about', new_window: 'false', class: '' }
                ];
        }
    };
    var Auth = function (nav_type) {
        switch (nav_type) {
            default:
                return [
                    { link: '#/events', label: 'Events', key: 'nav.events', new_window: 'false', class: '' },
                    { link: '#/donations', label: 'Donations', key: 'nav.donations', new_window: 'false', class: '' },
                    { link: '#/solicitations', label: 'Solicitations', key: 'nav.solicitations', new_window: 'false', class: '' },
                    { link: '#/blog', label: 'Blog', key: 'nav.blog', new_window: 'false', class: '' },
                    { link: '#/philosophy', label: 'Philosophy', key: 'nav.philosophy', new_window: 'false', class: '' },
                    { link: '#/about', label: 'About', key: 'nav.about', new_window: 'false', class: '' }
                ];
        }
    };
    var Dash = function (nav_type) {
        switch (nav_type) {
            default:
                return [
                    { link: '#/', label: 'Dashboard', key: 'nav.home', new_window: 'false', class: '' },
                    { link: '#/events', label: 'Events', key: 'nav.events', new_window: 'false', class: '' },
                    { link: '#/donations', label: 'Donations', key: 'nav.donations', new_window: 'false', class: '' },
                    { link: '#/solicitations', label: 'Solicitations', key: 'nav.solicitations', new_window: 'false', class: '' },
                    { link: '/auth/account', label: 'Account', key: 'nav.profile', new_window: 'false', class: '' }
//                    { link: '#/blog', label: 'Blog', key: 'nav.blog', new_window: 'false', class: '' },
//                    { link: '#/philosophy', label: 'Philosophy', key: 'nav.philosophy', new_window: 'false', class: '' },
//                    { link: '#/about', label: 'About', key: 'nav.about', new_window: 'false', class: '' }
                ];
        }
    };

    return {
        pub: Pub,
        dash: Dash,
        auth: Auth
    };
};

NavigationRepository.prototype = new _base();

module.exports = NavigationRepository;