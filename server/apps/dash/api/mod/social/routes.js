module.exports = function (app, mod_uri) {
    var ErrorHandler = require('../../../../../bog/bog.errors.js');

    var err_handler = new ErrorHandler();

    app.get(mod_uri + '/:uid?', function (req, res) {
        var mod_key = req.params.uid;
        var mod_key_arr = mod_key.split('.');
        var app = mod_key_arr[0];
        var uid;
        if (mod_key_arr[3]) {
            uid = mod_key_arr[3];
        }

        var social = get_social(app, uid, req.user);
        if (social) {
            res.json(social);
        } else {
            res.json(err_handler.wrap(5004));
        }

    });
    require('../../../../api.i18n.routes')(app, mod_uri);
};

function get_social(app, uid, user) {
    var SocialRepo = require('../../../../../domain/repositories/bog.domain.repositories.social.js');
    var social_repo = new SocialRepo(user);
    return social_repo.links(uid);
}