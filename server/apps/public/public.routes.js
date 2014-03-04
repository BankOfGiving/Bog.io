module.exports = function (app, express) {
    var path = require('path');
    var base_uri = '';

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
    app.use(base_uri + '/', express.static(path.join(__dirname, '../../../client/apps/pub')));
    app.use(base_uri + '/app', express.static(path.join(__dirname, '../../../client/apps/pub/' + asset_location + '/app')));
    app.use(base_uri + '/domain', express.static(path.join(__dirname, '../../../client/apps/pub/' + asset_location + '/domain')));
    app.use(base_uri + '/modules', express.static(path.join(__dirname, '../../../client/apps/pub/' + asset_location + '/modules')));
    app.use(base_uri + '/styles', express.static(path.join(__dirname, '../../../client/apps/pub/' + asset_location + '/styles')));
    app.use(base_uri + '/views', express.static(path.join(__dirname, '../../../client/apps/pub/' + asset_location + '/views')));

    // Shared Resource Paths
    app.use(base_uri + '/lib', express.static(path.join(__dirname, '../../../client/lib')));
    app.use(base_uri + '/img', express.static(path.join(__dirname, '../../../client/img')));

    app.get('/', function (req, res) {
        res.render(__dirname + '/views/index', { title: 'Welcome to the Bank of Giving!!' });
    });

    // Register Api Routes
    var api_uri = base_uri + '/api';
    require('./api/api.routes')(app, api_uri);
};