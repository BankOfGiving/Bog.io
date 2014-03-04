module.exports = {
    db: 'mongodb://localhost:27017/bog',

    sessionSecret: "Your Session Secret goes here",

    sendgrid: {
        user: 'Your SendGrid Username',
        password: 'Your SendGrid Password'
    },

    facebook: {
        clientID: '1386900388244159',
        clientSecret: '785ea53dd1ef804eb240b297aa4991a7',
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
        consumerKey: '9d61pQQu1XuCkc8Op6IqA',
        consumerSecret: 'bABg2DdiTa2tL0weeS4Y4VTAux87QWPi7zEa0IqFYg',
        callbackURL: '/auth/twitter/callback',
        passReqToCallback: true
    },

    google: {
        clientID: 'Your Client ID',
        clientSecret: 'Your Client Secret',
        callbackURL: '/auth/google/callback',
        passReqToCallback: true
    },

    steam: {
        apiKey: 'Your Steam API Key'
    },

    tumblr: {
        consumerKey: 'Your Consumer Key',
        consumerSecret: 'Your Consumer Secret',
        callbackURL: '/auth/tumblr/callback'
    },

    foursquare: {
        clientId: 'Your Client ID',
        clientSecret: 'Your Client Secret',
        redirectUrl: 'http://localhost:3000/auth/foursquare/callback'
    },

    paypal: {
        host: 'api.sandbox.paypal.com', // or api.paypal.com
        client_id: 'Your Client ID',
        client_secret: 'Your Client Secret',
        returnUrl: 'http://localhost:3000/api/paypal/success',
        cancelUrl: 'http://localhost:3000/api/paypal/cancel'
    }
};
