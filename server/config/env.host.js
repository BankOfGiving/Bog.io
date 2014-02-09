if (!config) {
    var config = {env: {}};
}

switch (process.env.NODE_ENV) {
    case 'development':
        config.env.host = {
            protocol: 'http',
            uri: '//localhost',
            port: 5000,
            path: '/'
        };
        break;
    case 'staging':
        config.env.host = {
            protocol: 'http',
            uri: '//lnx-ubu-data',
            port: 5000,
            path: '/'
        };
        break;
    case 'production':
        config.env.host = {
            protocol: 'http',
            uri: '//bankofgiving.com',
            port: 5000,
            path: '/'
        };
        break;
}

module.exports = config.env.host;