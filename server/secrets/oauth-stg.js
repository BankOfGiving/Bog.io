module.exports = {
    db: 'mongodb://localhost:27017/bog',

    sessionSecret: "Your Session Secret goes here",

    sendgrid: {
        user: 'Your SendGrid Username',
        password: 'Your SendGrid Password'
    },

    facebook: {
        clientID: '178224175708352',
        clientSecret: '0f75d3ce541c9271abe13256fd4d6645',
        callbackURL: '/auth/facebook/callback',
        passReqToCallback: true
    },

    github: {
        clientID: 'Your Client ID',
        clientSecret: 'Your Client Secret',
        callbackURL: '/auth/github/callback',
        passReqToCallback: true
    },

    twitter: {
        consumerKey: 'Your Consumer Key',
        consumerSecret: 'Your Consumer Secret',
        callbackURL: '/auth/twitter/callback',
        passReqToCallback: true
    },

    google: {
        clientID: 'Your Client ID',
        clientSecret: 'Your Client Secret',
        callbackURL: '/auth/google/callback',
        passReqToCallback: true
    }
};
