var Geocode = function () {
    var http = require('http');

    var GeocodeAddress = function (address, callback) {
        var g = new google(address, function (geocode) {
            callback(geocode);
        });
    };

    var google = function (address, callback) {
        address = address.split(' ').join('+');
        var options = {
            host: 'maps.googleapis.com',
            path: '/maps/api/geocode/json?address=' + address + '&sensor=false',
            port: 80,
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            }
        };

        var request = http.request(options, function (response) {
            var body = '';
            response.on('data', function (data) {
                body += data;
            });
            response.on('end', function () {
                callback(eval("(" + body + ")"));
            });
        });
        request.on('error', function (e) {
            console.log('Problem with request: ' + e.message);
        });
        request.end();
    };


    return {
        code: GeocodeAddress
    }
};

module.exports = Geocode;