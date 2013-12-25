var env = require('./env');

if (!config) {
    var config = {oauth: {}};
}

config.oauth.twitter = {
    development: {
        appId: '9d61pQQu1XuCkc8Op6IqA',
        appSecret: 'bABg2DdiTa2tL0weeS4Y4VTAux87QWPi7zEa0IqFYg',
        url: 'http://localhost:5000'
    }
};

module.exports = config.oauth.twitter[env.current()];