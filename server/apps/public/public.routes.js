module.exports = function (app, express) {
    var path = require('path');
    var uriBase = '';

    // Environment specific configs
    var asset_location = 'src';
    switch (app.get('env')) {
        case 'development':
            app.use(express.errorHandler());
            break;
        case 'staging':
            //asset_location = 'dist';
            break;
        case 'production':
            //asset_location = 'dist';
            break;
    }

    // Public Site Static Paths
    app.use(uriBase + '/', express.static(path.join(__dirname, '../../../client/apps/pub')));
    app.use(uriBase + '/app', express.static(path.join(__dirname, '../../../client/apps/pub/' + asset_location + '/app')));
    app.use(uriBase + '/domain', express.static(path.join(__dirname, '../../../client/apps/pub/' + asset_location + '/domain')));
    app.use(uriBase + '/modules', express.static(path.join(__dirname, '../../../client/apps/pub/' + asset_location + '/modules')));
    app.use(uriBase + '/styles', express.static(path.join(__dirname, '../../../client/apps/pub/' + asset_location + '/styles')));
    app.use(uriBase + '/views', express.static(path.join(__dirname, '../../../client/apps/pub/' + asset_location + '/views')));

    // Shared Resource Paths
    app.use(uriBase + '/lib', express.static(path.join(__dirname, '../../../client/lib')));
    app.use(uriBase + '/img', express.static(path.join(__dirname, '../../../client/img')));

    app.get('/', function (req, res) {

        console.log(req.user);
        res.render(__dirname + '/views/index', { title: 'Welcome to the Bank of Giving!!' });
    });

    // Register Api Routes
    require('./api/api.routes.donations')(app, uriBase + '/api');
    require('./api/api.routes.events')(app, uriBase + '/api');
    require(path.join(__dirname, '../../apps/i18n/api/api.routes.i18n'))(app, uriBase + '/api');
};