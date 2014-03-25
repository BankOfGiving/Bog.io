if (!config) {
    var config = {env: {}};
}

switch (process.env.NODE_ENV) {
    case 'staging':
        config.env.host = {
            protocol: 'http',
            uri: '//192.168.1.20',
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
    default:  //case 'development':
        config.env.host = {
            protocol: 'http',
            uri: '//localhost',
            port: 5000,
            path: '/'
        };
        break;
}

module.exports = config.env.host;