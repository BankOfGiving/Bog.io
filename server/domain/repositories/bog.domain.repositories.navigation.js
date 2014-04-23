var _base = require('./bog.domain.repositories._base.js');

var NavigationRepository = function (current_user) {
    // TODO:  Move navigation to database.  Add functionality for permission filtered result sets.

    var Pub = function (nav_type) {
        switch (nav_type) {
            default:
                return [
                    { link: '#/donations', label: 'Donations', key: 'nav.donations', new_window: 'false', class: '' },
                    { link: '#/events', label: 'Events', key: 'nav.events', new_window: 'false', class: '' },
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
            case "primary":
                return [
//                    { link: '#/', label: 'Dashboard', key: 'nav.home', new_window: 'false', class: '' },
//                    { link: '#/events', label: 'Events', key: 'nav.events', new_window: 'false', class: '' },
//                    { link: '#/donations', label: 'Donations', key: 'nav.donations', new_window: 'false', class: '' },
//                    { link: '#/solicitations', label: 'Solicitations', key: 'nav.solicitations', new_window: 'false', class: '' },
//                    { link: '/auth/account', label: 'Account', key: 'nav.profile', new_window: 'false', class: '' }
                    { link: '#/', label: 'Dashboard', key: 'nav.home', new_window: 'false', class: '' },
                    { link: '#/blog', label: 'Blog', key: 'nav.blog', new_window: 'false', class: '' },
                    { link: '#/philosophy', label: 'Philosophy', key: 'nav.philosophy', new_window: 'false', class: '' },
                    { link: '#/about', label: 'About', key: 'nav.about', new_window: 'false', class: '' }
                ];
            case "secondary":
                return [
                    {
                        "category": "donations",
                        "key": "nav.cat.donations",
                        "links": [
                            { link: '#/donations/listings', label: 'Listings', key: 'nav.link.donations.listings', new_window: 'false', class: '', disabled: true },
                            { link: '#/donations/following', label: 'Following', key: 'nav.link.donations.following', new_window: 'false', class: '', disabled: true },
                            { link: '#/donations/requested', label: 'Requested', key: 'nav.link.donations.requested', new_window: 'false', class: '', disabled: true },
                            { link: '#/donations/create', label: 'Create', key: 'nav.link.donations.create', new_window: 'false', class: '', disabled: true },
                            { link: '#/donations/create/wizard', label: 'Create', key: 'nav.link.donations.wizard', new_window: 'false', class: '', disabled: false }
                        ]
                    },
                    {
                        "category": "events",
                        "key": "nav.cat.events",
                        "links": [
                            { link: '#/events', label: 'Events', key: 'nav.link.events', new_window: 'false', class: '', disabled: true }
                        ]
                    },
                    {
                        "category": "solicitations",
                        "key": "nav.cat.solicitations",
                        "links": [
                            { link: '#/solicitations', label: 'Solicitations', key: 'nav.link.solicitations', new_window: 'false', class: '', disabled: true }
                        ]
                    },
                    {
                        "category": "account",
                        "key": "nav.cat.account",
                        "links": [
                            { link: '/auth/account', label: 'Account', key: 'nav.link.account', new_window: 'false', class: '', disabled: true }
                        ]
                    }
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