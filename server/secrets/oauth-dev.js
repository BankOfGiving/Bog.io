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
        clientID: "306968754574-g2e4sk2nku9dv0durckj0ht0p4028gpm.apps.googleusercontent.com",
        clientSecret: "mZOLAOzkTgerQhHM8W1TBKkc",
        callbackURL: '/auth/google/callback',
        passReqToCallback: true
    }
};
