if (!bog) {
    var bog = {};
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

        events: '/api/events/',
        event: '/api/event/',

        event_types: '/api/event_types/',
        event_type: '/api/event_type/',

        event_statuses: 'api/event/statuses/',

        solicitations: 'api/solicitations/',
        solicitation: 'api/solicitation/'
    }
};