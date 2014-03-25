var path = require('path');
switch (process.env.NODE_ENV) {
    case 'staging':
        var secrets = require(path.join(__dirname, '../../../../secrets/oauth-stg'));
        break;
    case 'production':
        var secrets = require(path.join(__dirname, '../../../../secrets/oauth-prd'));
        break;
    default:
        var secrets = require(path.join(__dirname, '../../../../secrets/oauth-dev'));
        break;
}
module.exports = secrets;