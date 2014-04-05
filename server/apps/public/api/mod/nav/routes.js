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

        var nav = get_nav(app, uid, req.user);
        if (nav) {
            res.json(nav);
        } else {
            res.json(err_handler.wrap(5004));
        }

    });
    require('../../../../api.i18n.routes')(app, mod_uri);
};

function get_nav(app, uid, user) {
    var NavRepo = require('../../../../../domain/repositories/bog.domain.repositories.navigation.js');
    var nav_repo = new NavRepo(user);
    switch (app) {
        case "dash":
            return nav_repo.dash(uid);
        default:
            return nav_repo.pub(uid);
    }
}

function mod_key_json(mod_key, culture_included) {
    var mod_key_arr = mod_key.split('.');
    var app = mod_key_arr[0];
    // var component = mod_key_arr[1];  /* always 'mod' */
    // var component_type = mod_key_arr[2]; /* always 'nav' */
    var uid;
    if (mod_key_arr[3]) {
        uid = mod_key_arr[3];
    }
}
