if (!config) {
    var config = { db: {} };
}

switch (process.env.NODE_ENV) {
    case 'staging':
        config.db.mongo = {
            host: '192.168.1.30',
            port: '27017',
            connectionString: 'mongodb://192.168.1.30:27017/bog'
        };
        break;
    case 'production':
        config.db.mongo = {
            host: 'localhost',
            port: '27017',
            connectionString: 'mongodb://localhost:27017/bog'
        };
        break;
    default:  // case 'development':
        config.db.mongo = {
            host: 'localhost',
            port: '27017',
            connectionString: 'mongodb://localhost:27017/bog'
        };
        break;
}

module.exports = config.db.mongo;