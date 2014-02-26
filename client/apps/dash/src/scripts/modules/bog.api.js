if (bog === null) {
    var bog = {
        api: {}
    };
}
bog.api = {
    uri: {
        auth: {
            isAuthenticated: '/auth/api/isauthenticated',
            logout: '/auth/api/logout'
        },
        search: {

        },
        profile: 'api/profile/',

        donations: 'api/donations/',
        donation: 'api/donation/',

        events: 'api/events/',
        event: 'api/event/',

        solicitations: 'api/solicitations/',
        solicitation: 'api/solicitation/'
    }
};