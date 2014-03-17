module.exports = function (app, mod_uri) {
    var url = require('url');


    var ErrorHandler = require('../../../../../bog/bog.errors.js');

    var err_handler = new ErrorHandler();

    // Internationalization
    require('../../../../api.i18n.routes')(app, mod_uri);

    require('../../data/api.routes.events')(app, mod_uri);
};