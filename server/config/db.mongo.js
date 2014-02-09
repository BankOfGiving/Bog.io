if (!config) {
    var config = {db: {}};
}

switch (process.env.NODE_ENV) {
    case 'development':
        config.db.mongo = {
            host: 'localhost',
            port: '27017',
            connectionString: 'mongodb://localhost:27017/bog'
        };
        break;
    case 'staging':
        config.db.mongo = {
            host: 'lnx-ubu-data',
            port: '27017',
            connectionString: 'mongodb://lnx-ubu-data:27017/bog'
        };
        break;
    case 'production':
        config.db.mongo = {
            host: 'localhost',
            port: '27017',
            connectionString: 'mongodb://localhost:27017/bog'
        };
        break;
}

module.exports = config.db.mongo;