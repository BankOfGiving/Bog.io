module.exports = function(app) {

    app.get('/', function(req, res){
        res.render(__dirname + '/views/index', { title: 'Welcome to the Bank of Giving!!' });
    });

    app.get('/home', function(req, res){
        res.render(__dirname + '/views/loggedin', {title: 'WELCOME!!!', user: req.user });
    });
};