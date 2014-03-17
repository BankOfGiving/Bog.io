module.exports = function (app, mod_uri) {
    var url = require('url');

    // Internationalization
    require('../../../../api.i18n.routes')(app, mod_uri);

    require('../../data/api.routes.events')(app, mod_uri);
};