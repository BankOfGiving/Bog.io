module.exports = function (app) {
    require('./auth/auth.routes')(app);
    require('./admin/admin.routes')(app);
    require('./dash/dash.routes')(app);
    require('./public/public.routes')(app);

    //require('./api/api.routes')(app);
};