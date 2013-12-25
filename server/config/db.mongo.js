var env = require('./env');

if (!config) {
    var config = {db: {}};
}

config.db.mongo = {
    development: {
        host: 'win-data01',
        port: '27017',
        connectionString: 'mongodb://win-data01:27017/bog'
    },
    development_local: {
        host: 'localhost',
        port: '27017',
        connectionString: 'mongodb://localhost:27017/bog'
    },
    production: {
        url: 'mongodb://win-data01/bog',
        port: '27017',
        connectionString: 'mongodb://win-data01:27017/bog'
    }
};
console.log(config.db.mongo[env.current()]);

module.exports = config.db.mongo[env.current()];