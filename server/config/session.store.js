module.exports = {
        development: {
                db: {
                    db: 'bog',
                    host: 'win-data01',
                    port: '27017',
                    collection: 'SessionStore',  // optional, default: sessions
                    "options" : { // all optional
                        "autoReconnect" : false,
                        "poolSize" : 200,
                        "socketOptions" : {
                            "timeout" : 0,
                            "noDelay" : true,
                            "keepAlive" : 1,
                            "encoding" : "utf8"
                        }
                    }
                },
            maxAge: new Date(Date.now() + 3600000),
            secret: 'dslfkjsdlkfjslkdfjsdlkfjslkdfjdslkjfsdlkjfdslkjfds'
            },
        production: {
            db: {
                db: 'bog',
                host: 'win-data01',
                port: '27017',
                "options" : { // all optional
                    "autoReconnect" : false,
                    "poolSize" : 200,
                    "socketOptions" : {
                        "timeout" : 0,
                        "noDelay" : true,
                        "keepAlive" : 1,
                        "encoding" : "utf8"
                    }
                    ,
                    collection: 'SessionStore' // optional, default: sessions
                },
                maxAge: new Date(Date.now() + 3600000),
                secret: 'dslfkjsdlkfjslkdfjsdlkfjslkdfjdslkjfsdlkjfdslkjfds'
            }
        }
};