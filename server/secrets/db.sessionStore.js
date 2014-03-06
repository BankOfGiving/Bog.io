if (!config) {
    var config = { db: {} };
}

switch (process.env.NODE_ENV) {
    case 'staging':
        config.db.sessionStore = {
            db: {
                db: 'bog',
                host: 'lnx-ubu-data',
                port: '27017',
                collection: 'SessionStore',  // optional, default: sessions
                "options": { // all optional
                    "autoReconnect": false,
                    "poolSize": 200,
                    "socketOptions": {
                        "timeout": 0,
                        "noDelay": true,
                        "keepAlive": 1,
                        "encoding": "utf8"
                    }
                }
            },
            maxAge: new Date(Date.now() + 3600000),
            secret: 'dslfkjsdlkfjslkdfjsdlkfjslkdfjdslkjfsdlkjfdslkjfds'
        };
        break;
    case 'production':
        config.db.sessionStore = {
            db: {
                db: 'bog',
                host: 'localhost',
                port: '27017',
                collection: 'SessionStore',  // optional, default: sessions
                "options": { // all optional
                    "autoReconnect": false,
                    "poolSize": 200,
                    "socketOptions": {
                        "timeout": 0,
                        "noDelay": true,
                        "keepAlive": 1,
                        "encoding": "utf8"
                    }
                }
            },
            maxAge: new Date(Date.now() + 3600000),
            secret: 'dslfkjsdlkfjslkdfjsdlkfjslkdfjdslkjfsdlkjfdslkjfds'
        };
        break;
    default:  //case 'development':
        config.db.sessionStore = {
            db: {
                db: 'bog',
                host: 'localhost',
                port: '27017',
                collection: 'SessionStore',  // optional, default: sessions
                "options": { // all optional
                    "autoReconnect": false,
                    "poolSize": 200,
                    "socketOptions": {
                        "timeout": 0,
                        "noDelay": true,
                        "keepAlive": 1,
                        "encoding": "utf8"
                    }
                }
            },
            maxAge: new Date(Date.now() + 3600000),
            secret: 'dslfkjsdlkfjslkdfjsdlkfjslkdfjdslkjfsdlkjfdslkjfds'
        };
        break;
}
module.exports = config.db.sessionStore;