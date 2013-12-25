var env = require('./env');

if (!config) {
    var config = {oauth: {}};
}

config.oauth.facebook = {
    appId: '178224175708352',
    appSecret: '0f75d3ce541c9271abe13256fd4d6645',
    url: 'http://24.205.139.117:5000'
};

module.exports = config.oauth.facebook[env.current()];