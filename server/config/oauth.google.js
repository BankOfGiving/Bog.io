if (!config) {
    var config = { oauth: {} };
}

config.oauth.google = {
    appId: '178224175708352',
    appSecret: '0f75d3ce541c9271abe13256fd4d6645',
    url: 'http://localhost:5000'
};

module.exports = config.oauth.google;