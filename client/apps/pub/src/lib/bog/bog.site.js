if (!bog) {
    var bog = {};
}
bog.site = function () {
    var getContentNavigation = function () {
        var loc_root = 'nav.';
        return [
            { link: '#/events', label: 'Events', key: loc_root + 'events', new_window: 'false', class: '' },
            { link: '#/donations', label: 'Donations', key: loc_root + 'donations', new_window: 'false', class: '' },
            { link: '#/solicitations', label: 'Solicitations', key: loc_root + 'solicitations', new_window: 'false', class: '' },
            { link: '#/blog', label: 'Blog', key: loc_root + 'blog', new_window: 'false', class: '' },
            { link: '#/philosophy', label: 'Philosophy', key: loc_root + 'philosophy', new_window: 'false', class: '' },
            { link: '#/about', label: 'About', key: loc_root + 'about', new_window: 'false', class: '' }
        ];
    };
    return {
        getContentNavigation: getContentNavigation
    };
};