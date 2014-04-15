module.exports = function (app, express) {
    require('./public/public.routes')(app, express);
    require('./auth/auth.routes')(app, express);
    require('./dash/dash.routes')(app, express);
    //require('./admin/admin.routes')(app, express);
};