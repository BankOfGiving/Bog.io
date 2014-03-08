module.exports = function (app, express) {
    var path = require('path');
    var base_uri = '/dash';

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
    app.all(base_uri + '/*', function (req, res, next) {
        if (req.user) {
            next();
        } else {
            res.redirect('/auth/', 401);
        }
    });

    // Dashboard Static Paths
    app.use(base_uri + '/', express.static(path.join(__dirname, '../../../client/apps/dash/' + asset_location + '/')));
    app.use(base_uri + '/markup', express.static(path.join(__dirname, '../../../client/apps/dash/' + asset_location + '/markup')));
    app.use(base_uri + '/views', express.static(path.join(__dirname, '../../../client/apps/dash/' + asset_location + '/views')));

    // Shared Resource Paths
    app.use(base_uri + '/img', express.static(path.join(__dirname, '../../../client/img')));
    app.use(base_uri + '/lib', express.static(path.join(__dirname, '../../../client/lib')));
    app.use(base_uri + '/modules', express.static(path.join(__dirname, '../../../client/mod')));
    app.use(base_uri + '/styles', express.static(path.join(__dirname, '../../../client/styles')));

    // View Routes
    app.get(base_uri + '/', function (req, res) {
        res.render(__dirname + '/views/index', { user: req.user });
    });

    // Api Routes
    var api_uri = base_uri + '/api';
    require('./api/api.routes')(app, api_uri);
};