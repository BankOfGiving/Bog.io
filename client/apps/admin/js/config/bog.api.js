var env = require('./env');

if (!bog) {
    var bog = {api: {}};
}
bog.api = {
    development: {
        uri: '/api/'
    },
    production: {
        uri: '/api/'
    }
}

module.exports = bog.api[env.current()];