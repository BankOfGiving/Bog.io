var env = require('./env');

if (!bog) {
    var bog = {api: {}};
}
bog.api = {
    development: {
        uri: '/api/v1/'
    },
    production: {
        uri: '/api/v1/'
    }
}

module.exports = bog.api[env.current()];